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

const login = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { email, password } = req.body.formData;
  try {
    await client.connect();
    const db = client.db("HollywoodBarberShop");

    // Find the user by their email
    const user = await db.collection("Clients").findOne({ email: email });

    if (!user) {
      // User not found
      return res.status(401).json({ status: 401, message: "Invalid credentials" });
    }

    // Compare the hashed password stored in the database with the input password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      // Passwords do not match
      return res.status(401).json({ status: 401, message: "Invalid credentials" });
    }

    // Passwords match, user is authenticated
    res.status(200).json({ status: 200, message: "Login successful" });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};


const addClient = async (req, res) =>{
  const client = new MongoClient(MONGO_URI, options);
  const { fname, lname, email, number, password } = req.body.formData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const _id = uuid();
  try {
    await client.connect();
    const db = client.db("HollywoodBarberShop");
    let existing;
      if(email!== ""){
        existing = await db.collection("Clients").findOne({ email: email });
      } else{
        existing = await db.collection("Clients").findOne({ number: number });
      }
    if(existing === null){
      await db.collection("Clients").insertOne({_id:_id, lname, fname, email, number, password: hashedPassword });
      res.status(200).json({ status: 200, data: {fname:fname, lname:lname, email:email, number:number}});
    } else{
      res.status(401).json({ status: 401, message: "User already exists" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
}

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
      res.status(200).json({ status: 200, data: data });
    },
    (error) => {
      console.error(error);
    }
  );
};

module.exports = { getBarberInfo, addContact, getWebsiteInfo, sendEmail,addClient,login };
