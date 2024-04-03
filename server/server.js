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
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// ---------------------------------------------------------------------------------------------
//endpoints
// ---------------------------------------------------------------------------------------------
//GET ENDPOINTS
// ---------------------------------------------------------------------------------------------

const getWebsiteInfo = async (req, res) => {
  const client = new MongoClient(MONGO_URI_RALF, options);
  try {
    await client.connect();
    const db = client.db("HollywoodBarberShop");
    const images = await db.collection("Images").find().toArray();
    const barbers = await db.collection("admin").find().toArray();
    const text = await db.collection("web_text").find().toArray();
    const services = await db.collection("services").find().toArray();
    res.status(200).json({
      status: 200,
      images: images,
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

const getBarberInfo = async (req, res) => {
  const client = new MongoClient(MONGO_URI_RALF, options);
  try {
    await client.connect();
    const db = client.db("HollywoodBarberShop");
    const data = await db.collection("admin").find().toArray();
    res.status(200).json({ status: 200, data: data });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

const getReservationById = async (req, res) => {
  const client = new MongoClient(MONGO_URI_RALF, options);
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
  const client = new MongoClient(MONGO_URI_RALF, options);
  try {
    await client.connect();
    const db = client.db("HollywoodBarberShop");
    const rsvps = await db.collection("reservations").find().toArray();
    res.status(200).json({ status: 200, data: rsvps });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

// ---------------------------------------------------------------------------------------------
// POST ENDPOINTS
// ---------------------------------------------------------------------------------------------
//FOR DATE FORMAT BEFORE SAVING IN DB
const formatDate = (inputDate) => {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
  };

  const formattedDate = new Date(inputDate).toLocaleDateString(
    "en-US",
    options
  );
  return formattedDate;
};
const addReservation = async (req, res) => {
  const client = new MongoClient(MONGO_URI_RALF, options);
  const formData = req.body.data[0];
  const userInfo = req.body.data[1];
  const _id = uuid();
  const formattedDate = formatDate(formData.date).replace(/,/g, "");
  const client_id = uuid();
  try {
    await client.connect();
    const db = client.db("HollywoodBarberShop");
    const reservation = {
      _id: _id,
      date: formattedDate,
      barber: formData.barber,
      service: formData.service,
      slot: formData.slot,
      fname: userInfo.fname,
      lname: userInfo.lname,
      email: userInfo.email,
      number: userInfo.number,
      client_id: client_id,
    };
    // add the reservation to the database
    await db.collection("reservations").insertOne(reservation);

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
    } else {
      await db
        .collection("Clients")
        .updateOne({ _id: isClient._id }, { $push: { reservations: _id } });
    }

    // send SMS to the user
    await twilioClient.messages.create({
      body: `Bonjour ${reservation.fname} ${
        reservation.lname !== "" && reservation.lname
      }, votre réservation au Hollywood Barbershop est confirmée pour ${
        reservation.date
      } à ${reservation.slot[0].split("-")[1]}. Vous recevrez un ${
        reservation.service.name
      } pour ${reservation.service.price} CAD. ~${reservation.barber}
      
      Hello ${reservation.fname} ${
        reservation.lname !== "" && reservation.lname
      }, your reservation at Hollywood Barbershop is confirmed for ${formattedDate} at ${
        reservation.slot[0].split("-")[1]
      }. You will be getting a ${reservation.service.name} for ${
        reservation.service.price
      }. ~${reservation.barber}`,
      messagingServiceSid: "MG92cdedd67c5d2f87d2d5d1ae14085b4b",
      to: userInfo.number,
    });

    // send response to the client
    res.status(200).json({
      status: 200,
      data: {
        date: formData.date,
        barber: formData.barber,
        service: formData.service,
        slot: formData.slot,
        fname: userInfo.fname,
        lname: userInfo.lname,
        email: userInfo.email,
        number: userInfo.number,
        _id: _id,
      },
    });
  } catch (err) {
    // handle errors
    console.log(err);
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

module.exports = {
  getBarberInfo,
  getWebsiteInfo,
  getReservations,
  addReservation,
  getReservationById,
};
