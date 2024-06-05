require("dotenv").config();
const { MongoClient } = require("mongodb");
const uuid = require("uuid").v4;
const accountSid = process.env.SMS_SSID;
const authToken = process.env.SMS_AUTH_TOKEN;
const twilioClient = require("twilio")(accountSid, authToken);

// ---------------------------------------------------------------------------------------------
//Mongo stuff
// ---------------------------------------------------------------------------------------------

const MONGO_URI_RALF = process.env.MONGO_URI_RALF;

// ---------------------------------------------------------------------------------------------
//endpoints
// ---------------------------------------------------------------------------------------------
//GET ENDPOINTS
// ---------------------------------------------------------------------------------------------

const getWebsiteInfo = async (req, res) => {
  const client = new MongoClient(MONGO_URI_RALF);
  try {
    await client.connect();
    const db = client.db("HollywoodBarberShop");
    const barbers = await db.collection("admin").find().toArray();
    const text = await db.collection("web_text").find().toArray();
    const services = await db.collection("services").find().toArray();
    res.status(200).json({
      status: 200,
      barbers: barbers,
      text: text,
      services: services,
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
const getSlideShowImages = async (req, res) => {
  const client = new MongoClient(MONGO_URI_RALF);
  const qurey = { filename: "slideShow" };
  try {
    await client.connect();
    const db = client.db("HollywoodBarberShop");
    const data = await db.collection("Images").findOne(qurey);
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
    await client.connect();
    const db = client.db("HollywoodBarberShop");
    const rsvps = await db.collection("reservations").find().toArray();
    const rsvpsWithoutPersonalInfo = rsvps.map((rsvp) => {
      return {
        date: rsvp.date,
        barber: rsvp.barber,
        service: rsvp.service,
        slot: rsvp.slot,
      };
    });

    res.status(200).json({ status: 200, data: rsvpsWithoutPersonalInfo });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
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
    await twilioClient.messages.create({
      body: `Bonjour ${reservation.fname} ${
        reservation.lname !== "" && reservation.lname
      }, votre réservation au Hollywood Barbershop est confirmée pour ${
        reservation.date
      } à ${reservation.slot[0].split("-")[1]}. Vous recevrez une ${
        reservation.service.name
      } pour ${reservation.service.price} CAD. ~${reservation.barber}
      
      Hello ${reservation.fname} ${
        reservation.lname !== "" && reservation.lname
      }, your reservation at Hollywood Barbershop is confirmed for ${
        reservation.date
      } at ${reservation.slot[0].split("-")[1]}. You will be getting a ${
        reservation.service.english
      } for ${reservation.service.price}. ~${reservation.barber}
      
      ID: ${_id}
      `,
      messagingServiceSid: "MG92cdedd67c5d2f87d2d5d1ae14085b4b",
      to: userInfo.number,
    });

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

const getMonthIndex = (monthName) => {
  const months = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };
  return months[monthName];
};

const deleteReservation = async (req, res) => {
  const client = new MongoClient(MONGO_URI_RALF);
  const { phone, resId } = req.body;
  try {
    await client.connect();
    const db = client.db("HollywoodBarberShop");
    const reservation = await db.collection("reservations").findOne({
      _id: resId,
      number: phone,
    });
    if (reservation === null) {
      res.status(404).json({ status: 404, message: "Reservation not found" });
    } else {
      let message;
      // check if reservation is in more than 3 hours
      // get the day
      const dateParts = reservation.date.split(" "); // Split date string into parts

      const suffix = reservation.slot[0].split("-")[1].slice(-2); // Extract AM/PM
      let time = reservation.slot[0].split("-")[1].slice(0, -2); // Extract time, e.g., "12:30"
      if (suffix === "pm" && time.split(":")[0] !== "12") {
        time = parseInt(time.split(":")[0]) + 12 + ":" + time.split(":")[1]; // Convert 12-hour time to 24-hour time
      }
      const [hours, minutes] = time.split(":").map(Number); // Split time into hours and minutes

      // Construct the Date object in UTC
      const dateTime = new Date(
        Date.UTC(
          dateParts[3], // Year
          getMonthIndex(dateParts[1]), // Month (converted to 0-based index)
          dateParts[2], // Day
          hours,
          minutes
        )
      );

      const now = new Date(
        Date.UTC(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          new Date().getHours(),
          new Date().getMinutes()
        )
      );

      const differenceInMilliseconds = dateTime.getTime() - now.getTime();
      const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60); //Convert milliseconds to hours
      if (differenceInHours > 3) {
        // Reservation is more than 3 hours away from now
        await db.collection("reservations").deleteOne({
          _id: resId,
          number: phone,
        });
        //send sms to the user that the reservation is cancelled
        await twilioClient.messages.create({
          body: `Bonjour ${reservation.fname} ${reservation.lname}, votre réservation au Hollywood Barbershop est annulée. ~Hollywood Barbershop
          
          Hello ${reservation.fname} ${reservation.lname}, your reservation at Hollywood Barbershop is cancelled. ~Hollywood Barbershop`,
          messagingServiceSid: "MG92cdedd67c5d2f87d2d5d1ae14085b4b",
          to: phone,
        });
        res
          .status(200)
          .json({ status: 200, reservation: reservation, message: message });
      } else if (differenceInHours < 0) {
        res.status(404).json({
          status: 404,
          reservation: reservation,
          message: "Reservation is in the past.",
        });
      } else {
        // Reservation is within 3 hours from now
        res.status(404).json({
          status: 404,
          reservation: reservation,
          message: "Reservation is in less than 3 hours.",
        });
      }
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

module.exports = {
  getWebsiteInfo,
  getReservations,
  addReservation,
  getReservationById,
  deleteReservation,
  getSlideShowImages,
};
