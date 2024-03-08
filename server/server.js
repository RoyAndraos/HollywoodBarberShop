require("dotenv").config();
const { MongoClient } = require("mongodb");
const uuid = require("uuid").v4;

// ---------------------------------------------------------------------------------------------
//brevo stuff, email + TODO:sms
// ---------------------------------------------------------------------------------------------

const brevo = require("@getbrevo/brevo");
const { htmlContent } = require("./templates/Welcome");
let defaultClient = brevo.ApiClient.instance;
let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.EMAIL_API_KEY;

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
    };

    // add the reservation to the database
    await db.collection("reservations").insertOne(reservation);

    //check if client exists
    const isClient = await db
      .collection("Clients")
      .findOne({ email: reservation.email });
    //if client does not exist, create client
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

    // send an email to the user
    await sendEmail(
      userInfo.email,
      reservation.barber,
      userInfo.fname,
      userInfo.lname,
      reservation.date,
      reservation.slot[0].split("-")[1],
      reservation.service.name,
      reservation.service.price
    );

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

const sendEmail = async (
  email,
  fname,
  userFName,
  userLName,
  date,
  time,
  service,
  price
) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  let apiInstance = new brevo.TransactionalEmailsApi();
  let sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.subject = "Your reservation at Hollywood Barbershop";
  sendSmtpEmail.htmlContent = htmlContent(
    userFName,
    formattedDate,
    time,
    service,
    price
  );
  sendSmtpEmail.sender = {
    name: fname,
    email: "hollywoodfairmount@gmail.com",
  };

  sendSmtpEmail.to = [{ email: email, name: `${userFName + " " + userLName}` }];
  await apiInstance.sendTransacEmail(sendSmtpEmail);
};

// const sendSMS = async (
//   number,
//   fname,
//   userFName,
//   userLName,
//   date,
//   time,
//   service,
//   price
// ) => {
//   let apiInstance = new brevo.TransactionalSMSApi();
//   let sendTransacSms = new brevo.SendTransacSms();
//   sendTransacSms = {
//     sender: "RoyDev",
//     recipient: "5144304287",
//     content: "hello",
//   };

//   apiInstance.sendTransacSms(sendTransacSms).then(
//     function (data) {
//       console.log(
//         "API called successfully. Returned data: " + JSON.stringify(data)
//       );
//     },
//     function (error) {
//       console.error(error);
//     }
//   );
// };

module.exports = {
  getBarberInfo,
  getWebsiteInfo,
  sendEmail,
  getReservations,
  addReservation,
  getReservationById,
};
