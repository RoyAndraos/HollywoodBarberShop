const { MongoClient } = require("mongodb");
require("dotenv").config();
const { ADMIN_PASSWORD } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
