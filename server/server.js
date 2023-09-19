require("dotenv").config();
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const uuid = require("uuid").v4;

// ---------------------------------------------------------------------------------------------
//brevo stuff, email + TODO:sms
// ---------------------------------------------------------------------------------------------

const brevo = require("@getbrevo/brevo");
const htmlContent = require("./templates/Welcome");
let defaultClient = brevo.ApiClient.instance;
let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.EMAIL_API_KEY;

// ---------------------------------------------------------------------------------------------
//Mongo stuff
// ---------------------------------------------------------------------------------------------

const MONGO_URI = process.env.MONGO_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// ---------------------------------------------------------------------------------------------
// Token stuff
// ---------------------------------------------------------------------------------------------

const jwt = require("jsonwebtoken");
const JWT_TOKEN_KEY = process.env.JWT_TOKEN_KEY;
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }

  jwt.verify(token, JWT_TOKEN_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Token is valid; user identification is available in decoded.userId
    req.userId = decoded.userId;
    next();
  });
};
// ---------------------------------------------------------------------------------------------
//endpoints
// ---------------------------------------------------------------------------------------------
//GET ENDPOINTS
// ---------------------------------------------------------------------------------------------

const getWebsiteInfo = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
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
  const client = new MongoClient(MONGO_URI, options);
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

const getProfileInfo = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const _id = req.params._id;
  try {
    await client.connect();
    const db = client.db("HollywoodBarberShop");
    const data = await db.collection("Clients").findOne({ _id: _id });
    res.status(200).json({ status: 200, data: data });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

const getReservationById = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const _id = req.params._id;
  console.log(req.params._id);
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

const getUserInfo = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("HollywoodBarberShop");
    const user = await db
      .collection("Clients")
      .findOne({ _id: req.userId }, { projection: { password: 0 } });
    res.status(200).json({ status: 200, data: user });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

const getReservations = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
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

const addReservation = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const formData = req.body.data[0];
  const userInfo = req.body.data[1];
  const _id = uuid();

  try {
    await client.connect();
    const db = client.db("HollywoodBarberShop");
    const reservation = {
      _id: _id,
      date: formData.date,
      barber: formData.barber,
      service: formData.service,
      slot: formData.slot,
      fname: userInfo.fname,
      lname: userInfo.lname,
      email: userInfo.email,
      number: userInfo.number,
    };

    // add the reservation to the database
    await db.collection("reservations").insertOne(reservation);

    // send an email to the user
    await sendEmail(req, res, userInfo.email);

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
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

const sendEmail = async (req, res, email) => {
  console.log(email);
  let apiInstance = new brevo.TransactionalEmailsApi();
  let sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.subject = "My love";
  sendSmtpEmail.htmlContent = htmlContent;
  sendSmtpEmail.sender = {
    name: "John Doe",
    email: "roy_andraos@live.fr",
  };
  sendSmtpEmail.to = [{ email: email, name: "Jane Doe" }];
  sendSmtpEmail.params = {
    parameter: "My param value",
    subject: "common subject",
  };

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    (data) => {
      res.status(200).json({ status: 200, data: data });
    },
    (error) => {
      console.error(error);
    }
  );
};

module.exports = {
  getBarberInfo,
  getWebsiteInfo,
  sendEmail,
  verifyToken,
  getUserInfo,
  getReservations,
  addReservation,
  getProfileInfo,
  getReservationById,
};
