require("dotenv").config();
const { MongoClient } = require("mongodb");

const MONGO_URI = process.env.MONGO_URI;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
const addContact = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { email, phoneNumber } = req.body;
  try {
    await client.connect();
    const db = client.db("HollywoodBarberShop");
    const data = await db
      .collection("toContact")
      .insertOne({ email, phoneNumber });
    res.status(200).json({ status: 200, data: data });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

module.exports = { getBarberInfo, addContact };
