require("dotenv").config();
const { MongoClient } = require("mongodb");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = { signIn, verifyToken, getDashboard };
