require("dotenv").config();
const { MongoClient } = require("mongodb");
const uuid = require("uuid").v4;
const accountSid = process.env.SMS_SSID;
const authToken = process.env.SMS_AUTH_TOKEN;
const twilioClient = require("twilio")(accountSid, authToken);
// ---------------------------------------------------------------------------------------------
// Mailtrap stuff
// ---------------------------------------------------------------------------------------------
const { MailtrapClient } = require("mailtrap");
const mailtrapClient = new MailtrapClient({
  token: process.env.EMAIL_TOKEN,
});

const scheduleEmail = (reservationId, emailData, sendAt) => {
  const schedule = require("node-schedule");

  const job = schedule.scheduleJob(sendAt, async () => {
    try {
      await mailtrapClient.send({
        from: emailData.from,
        to: emailData.to,
        subject: emailData.subject,
        text: emailData.text,
        category: emailData.category,
      });
    } catch (err) {
      console.error("Error sending scheduled email:", err);
    }
    // Remove job reference after execution
    delete scheduledJobs[reservationId];
  });

  // Store job reference
  scheduledJobs[reservationId] = job;
  console.log(`Email scheduled for reservation: ${reservationId} at ${sendAt}`);
};

const cancelScheduledEmail = (reservationId) => {
  if (!scheduledJobs) return;
  const job = scheduledJobs[reservationId];
  if (job) {
    job.cancel(); // Cancel the job
    delete scheduledJobs[reservationId]; // Remove reference
    console.log(`Scheduled email for reservation ${reservationId} canceled.`);
  } else {
    console.log(`No scheduled email found for reservation ${reservationId}.`);
  }
};

const scheduledJobs = {};

// ---------------------------------------------------------------------------------------------
//Mongo stuff
// ---------------------------------------------------------------------------------------------

const MONGO_URI_RALF = process.env.MONGO_URI_RALF;

// ---------------------------------------------------------------------------------------------
//endpoints
// ---------------------------------------------------------------------------------------------
//GET ENDPOINTS
// ---------------------------------------------------------------------------------------------
const getResByPhone = async (req, res) => {
  const client = new MongoClient(MONGO_URI_RALF);
  const phoneNumber = req.params._id; // Rename for clarity

  try {
    await client.connect();
    const db = client.db("HollywoodBarberShop");

    // Find the client by phone number
    const data = await db
      .collection("Clients")
      .findOne({ number: phoneNumber });

    if (!data) {
      return res.status(404).json({ status: 404, message: "Client not found" });
    }

    // Fetch reservations for the client
    const reservations = await Promise.all(
      data.reservations.map(async (res_id) => {
        return db.collection("reservations").findOne({ _id: res_id });
      })
    );

    // Send response
    res.status(200).json({ status: 200, data: { client: data, reservations } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};
const getReservationForDelete = async (req, res) => {
  const client = new MongoClient(MONGO_URI_RALF);
  const resId = req.params._id;
  try {
    await client.connect();
    const db = client.db("HollywoodBarberShop");
    const reservation = await db
      .collection("reservations")
      .findOne({ _id: resId });
    if (reservation === null) {
      res.status(404).json({ status: 404, message: "Reservation not found" });
    } else {
      res.status(200).json({ status: 200, reservation: reservation });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

const getWebsiteInfo = async (req, res) => {
  const client = new MongoClient(MONGO_URI_RALF);
  try {
    const db = client.db("HollywoodBarberShop");

    const [barbers, text, services] = await Promise.all([
      db
        .collection("admin")
        .find({}, { projection: { picture: 0 } })
        .toArray(),
      db.collection("web_text").find().toArray(),
      db.collection("services").find().toArray(),

      // db.collection("servicesEmp").find().toArray(),
    ]);

    res.status(200).json({
      status: 200,
      barbers: barbers,
      text: text,
      services: services,
      // servicesEmp: servicesEmp,
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

const getReservationById = async (req, res) => {
  const client = new MongoClient(MONGO_URI_RALF);
  const _id = req.params._id;
  try {
    await client.connect();
    const db = client.db("HollywoodBarberShop");
    const data = await db.collection("reservations").findOne({ _id: _id });
    res.status(200).json({ status: 200, data: data });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

const getReservations = async (req, res) => {
  const client = new MongoClient(MONGO_URI_RALF);
  try {
    await client.connect(); // Make sure the client connects before querying
    const db = client.db("HollywoodBarberShop");

    // Get the current date and determine the months to query
    const now = new Date();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentMonth = now.getMonth();

    // Calculate the months to query
    const monthsToQuery = [
      months[currentMonth], // Current month
      months[(currentMonth + 1) % 12], // Next month
      months[(currentMonth + 2) % 12], // Month after next
    ];

    // Fetch reservations for all months in parallel
    const reservationsArrays = await Promise.all(
      monthsToQuery.map((month) => {
        const query = { date: { $regex: month, $options: "i" } };
        return db
          .collection("reservations")
          .find(query, {
            projection: {
              client_id: 0,
              fname: 0,
              lname: 0,
              email: 0,
              number: 0,
              service: 0,
            },
          })
          .toArray();
      })
    );

    // Flatten the results
    const reservations = reservationsArrays.flat();
    const blockedSlots = await db.collection("blockedSlots").find().toArray();
    // Send the response
    res
      .status(200)
      .json({ status: 200, data: reservations, blockedSlots: blockedSlots });
  } catch (err) {
    console.error("Error in getReservations:", err);
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    // Ensure the client is closed only after all operations are complete
    await client.close();
  }
};

// ---------------------------------------------------------------------------------------------
// POST ENDPOINTS
// ---------------------------------------------------------------------------------------------

const addReservation = async (req, res) => {
  const client = new MongoClient(MONGO_URI_RALF);
  const formData = req.body[0];
  const userInfo = req.body[1];
  const _id = uuid();
  const client_id = uuid();

  try {
    await client.connect();
    const db = client.db("HollywoodBarberShop");
    let reservation = {
      _id: _id,
      date: formData.date,
      barber: formData.barber,
      service: formData.service,
      slot: formData.slot,
      fname: userInfo.fname,
      lname: userInfo.lname,
      email: userInfo.email,
      number: userInfo.number,
      client_id: client_id,
    };

    //Last check for Overlapping reservations
    //STEP ONE: Get all reservations for the selected date and barber
    const reservations = await db
      .collection("reservations")
      .find({ date: reservation.date, barber: reservation.barber })
      .toArray();

    //STEP TWO: Check if the selected slot is available based on the reserved slots
    const isSlotAvailable = reservations.every((res) => {
      return !reservation.slot.some((slot) => res.slot.includes(slot));
    });

    if (!isSlotAvailable) {
      console.log(
        "Selected slot is already reserved. Please select another slot."
      );
      return res.status(404).json({
        status: 404,
        message:
          "Selected slot is already reserved. Please select another slot.",
      });
    }

    // check if client exists
    const isClient = await db
      .collection("Clients")
      .findOne({ number: reservation.number });
    // if client does not exist, create client
    if (isClient === null) {
      await db.collection("Clients").insertOne({
        _id: client_id,
        email: reservation.email,
        fname: reservation.fname,
        lname: reservation.lname,
        number: reservation.number,
        note: "",
        reservations: [_id],
      });
      // add the reservation to the database
      await db.collection("reservations").insertOne(reservation);
    } else {
      //update the client's reservations array
      await db
        .collection("Clients")
        .updateOne({ _id: isClient._id }, { $push: { reservations: _id } });
      // add the reservation to the database
      reservation.client_id = isClient._id;
      await db.collection("reservations").insertOne(reservation);
    }

    // send SMS to the user
    if (userInfo.numberValid) {
      try {
        await twilioClient.messages.create({
          body: `No Reply ~Hollywood Barbershop
            Bonjour ${reservation.fname} ${
            reservation.lname || ""
          }, votre réservation au Hollywood Barbershop est confirmée pour ${
            reservation.date
          } à ${reservation.slot[0].split("-")[1]} avec ${
            reservation.barber
          }. Vous recevrez une ${reservation.service.name} pour ${
            reservation.service.price
          } CAD. ~Hollywood Barbershop
    
            Hello ${reservation.fname} ${
            reservation.lname || ""
          }, your reservation at Hollywood Barbershop is confirmed for ${
            reservation.date
          } at ${reservation.slot[0].split("-")[1]} with ${
            reservation.barber
          }. You will be getting a ${reservation.service.english} for ${
            reservation.service.price
          } CAD. 
              Pour annuler (to cancel): https://hollywoodfairmountbarbers.com/cancel/${
                reservation._id
              }
            `,
          messagingServiceSid: "MG92cdedd67c5d2f87d2d5d1ae14085b4b",
          to: userInfo.number,
        });
      } catch (err) {
        console.error("Error sending confirmation SMS:", err);
      }
    } else {
      const emailData = {
        from: {
          email: "hello@hollywoodfairmountbarbers.com",
          name: `${reservation.barber}`,
        },
        to: userInfo.email,
        subject: "Reservation Reminder",
        text: `No Reply ~Hollywood Barbershop
            Bonjour ${reservation.fname} ${
          reservation.lname || ""
        }, votre réservation au Hollywood Barbershop est confirmée pour aujourd'hui à ${
          reservation.slot[0].split("-")[1]
        } avec ${reservation.barber}. Vous recevrez une ${
          reservation.service.name
        } pour ${reservation.service.price} CAD. ~Hollywood Barbershop
    
            Hello ${reservation.fname} ${
          reservation.lname || ""
        }, your reservation at Hollywood Barbershop is confirmed for today at ${
          reservation.slot[0].split("-")[1]
        } with ${reservation.barber}. You will be getting a ${
          reservation.service.english
        } for ${reservation.service.price} CAD. 
              Pour annuler (to cancel): https://hollywoodfairmountbarbers.com/cancel/${
                reservation._id
              }
            `,
        category: "Reservation Confirmation",
      };

      //send email
      try {
        await mailtrapClient.send(emailData);
      } catch (err) {
        console.error("Error sending confirmation email:", err);
      }
    }

    // send response to the client
    res.status(200).json({
      status: 200,
      data: reservation,
    });
  } catch (err) {
    // handle errors
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

// ---------------------------------------------------------------------------------------------
// DELETE ENDPOINTS
// ---------------------------------------------------------------------------------------------

const deleteReservation = async (req, res) => {
  const client = new MongoClient(MONGO_URI_RALF);
  const { resId } = req.body;
  console.log("resId", resId);
  console.log("req.body", req.body);
  try {
    const db = client.db("HollywoodBarberShop");

    // Find the reservation by ID
    const reservation = await db
      .collection("reservations")
      .findOne({ _id: resId });

    if (!reservation) {
      console.log("Reservation not found:", resId);
      return res
        .status(404)
        .json({ status: 404, message: "Reservation not found" });
    }

    // Delete the reservation
    await db.collection("reservations").deleteOne({ _id: resId });

    // Send SMS notification about the cancellation
    await twilioClient.messages.create({
      body: `No Reply - Hollywood Barbershop
      
      Bonjour ${reservation.fname} ${
        reservation.lname || ""
      }, votre réservation au Hollywood Barbershop est annulée. 

Hello ${reservation.fname} ${
        reservation.lname || ""
      }, your reservation at Hollywood Barbershop is cancelled. `,
      messagingServiceSid: "MG92cdedd67c5d2f87d2d5d1ae14085b4b",
      to: reservation.number,
    });

    //delete the scheduled sms
    const scheduledSMS = await db
      .collection("scheduledSMS")
      .findOne({ res_id: resId });
    if (scheduledSMS) {
      await twilioClient.messages(scheduledSMS.messageSid).remove();
      await db.collection("scheduledSMS").deleteOne({ res_id: resId });
    }
    // Cancel the scheduled email
    cancelScheduledEmail(resId);
    // Respond with success
    res.status(200).json({
      status: 200,
      reservation,
      message: "Reservation successfully deleted.",
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    await client.close();
  }
};
// const getMonthIndex = (monthName) => {
//   const months = {
//     Jan: 0,
//     Feb: 1,
//     Mar: 2,
//     Apr: 3,
//     May: 4,
//     Jun: 5,
//     Jul: 6,
//     Aug: 7,
//     Sep: 8,
//     Oct: 9,
//     Nov: 10,
//     Dec: 11,
//   };
//   return months[monthName];
// };
// const deleteReservation = async (req, res) => {
//   const client = new MongoClient(MONGO_URI_RALF);
//   const { resId } = req.body;
//   try {
//     await client.connect();
//     const db = client.db("HollywoodBarberShop");
//     //since resId is the 1st 5 characters of the reservation's _id, we can use it to find the reservation when _id includes resId
//     const reservation = await db
//       .collection("reservations")
//       .findOne({ _id: resId });
//     if (reservation === null) {
//       res.status(404).json({ status: 404, message: "Reservation not found" });
//     } else {
//       let message;
//       // check if reservation is in more than 3 hours
//       // get the day
//       const dateParts = reservation.date.split(" "); // Split date string into parts
//       const suffix = reservation.slot[0].split("-")[1].slice(-2); // Extract AM/PM
//       let time = reservation.slot[0].split("-")[1].slice(0, -2); // Extract time, e.g., "12:30"
//       if (suffix === "pm" && time.split(":")[0] !== "12") {
//         time = parseInt(time.split(":")[0]) + 12 + ":" + time.split(":")[1]; // Convert 12-hour time to 24-hour time
//       }
//       const [hours, minutes] = time.split(":").map(Number); // Split time into hours and minutes

//       // Construct the Date object in UTC
//       const dateTime = new Date(
//         Date.UTC(
//           dateParts[3], // Year
//           getMonthIndex(dateParts[1]), // Month (converted to 0-based index)
//           dateParts[2], // Day
//           hours,
//           minutes
//         )
//       );

//       const now = new Date(
//         Date.UTC(
//           new Date().getFullYear(),
//           new Date().getMonth(),
//           new Date().getDate(),
//           new Date().getHours(),
//           new Date().getMinutes()
//         )
//       );
//       const differenceInMilliseconds = dateTime.getTime() - now.getTime();
//       const differenceInHours = (
//         differenceInMilliseconds /
//         (1000 * 60 * 60)
//       ).toFixed(2); //Convert milliseconds to hours
//       if (differenceInHours > 3) {
//         // Reservation is more than 3 hours away from now
//         const deleteResult = await db.collection("reservations").deleteOne({
//           _id: resId,
//         });
//         if (deleteResult.deletedCount === 0) {
//           res
//             .status(500)
//             .json({ status: 500, message: "Failed to delete reservation" });
//         }
//         //send sms to the user that the reservation is cancelled
//         await twilioClient.messages.create({
//           body: `Bonjour ${reservation.fname} ${reservation.lname}, votre réservation au Hollywood Barbershop est annulée. ~Hollywood Barbershop

//           Hello ${reservation.fname} ${reservation.lname}, your reservation at Hollywood Barbershop is cancelled. ~Hollywood Barbershop`,
//           messagingServiceSid: "MG92cdedd67c5d2f87d2d5d1ae14085b4b",
//           to: reservation.number,
//         });
//         message = "success";
//         res
//           .status(200)
//           .json({ status: 200, reservation: reservation, message: message });
//       } else if (differenceInHours < 0) {
//         res.status(200).json({
//           status: 200,
//           reservation: reservation,
//           message: "Reservation is in the past.",
//         });
//       } else {
//         // Reservation is within 3 hours from now
//         res.status(200).json({
//           status: 200,
//           reservation: reservation,
//           difference: differenceInHours,
//           message:
//             "Reservation is in less than 3 hours. If you still wish to cancel, please call the shop at +1(438) 923-7297.",
//         });
//       }
//     }
//   } catch (err) {
//     res.status(500).json({ status: 500, message: err.message });
//   } finally {
//     client.close();
//   }
// };

module.exports = {
  getWebsiteInfo,
  getReservations,
  addReservation,
  getReservationById,
  deleteReservation,
  getReservationForDelete,
  getResByPhone,
};
