require("dotenv").config();
const { MongoClient } = require("mongodb");

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
    res
      .status(200)
      .json({ status: 200, images: images, barbers: barbers, text: text });
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

// ---------------------------------------------------------------------------------------------
//POST ENDPOINTS
// ---------------------------------------------------------------------------------------------

const addContact = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { email, phoneNumber } = req.body;
  try {
    let data = {};
    if (!email && phoneNumber) {
      data = { phoneNumber: phoneNumber };
    } else {
      data = { email: email };
    }
    await client.connect();
    const db = client.db("HollywoodBarberShop");
    await db.collection("toContact").insertOne({ email, phoneNumber });
    res.status(200).json({ status: 200, data: data });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};
const sendEmail = async (req, res) => {
  let apiInstance = new brevo.TransactionalEmailsApi();
  let sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.subject = "My love";
  sendSmtpEmail.htmlContent = htmlContent;
  sendSmtpEmail.sender = {
    name: "John Doe",
    email: "roy_andraos@live.fr",
  };
  sendSmtpEmail.to = [{ email: "roy_andraos@live.fr", name: "Jane Doe" }];
  sendSmtpEmail.params = {
    parameter: "My param value",
    subject: "common subject",
  };

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    (data) => {
      console.log(
        "API called successfully. Returned data: " + JSON.stringify(data)
      );
      res.status(200).json({ status: 200, data: data });
    },
    (error) => {
      console.error(error);
    }
  );
};

module.exports = { getBarberInfo, addContact, getWebsiteInfo, sendEmail };
