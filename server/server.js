require("dotenv").config();
const { MongoClient } = require("mongodb");
const jwt = require("jsonwebtoken");

const ADMIN_BAYYO = process.env.ADMIN_BAYYO;
const ADMIN_RALF = process.env.ADMIN_RALF;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Failed to authenticate token" });
    }

    req.userId = decoded.userId;
    next();
  });
};

const getDashboard = async (req, res) => {
  const { username } = req.params;
  console.log(username);
  res.status(200).json({ status: 200, message: "yeeey" });
};

const signIn = (req, res) => {
  const { info } = req.body;
  if (info.username === ADMIN_BAYYO || info.username === ADMIN_RALF) {
    if (ADMIN_PASSWORD === info.password) {
      if (info.username === ADMIN_BAYYO) {
        const token = jwt.sign({ userId: ADMIN_BAYYO }, JWT_SECRET, {
          expiresIn: "1h",
        });
        res.status(200).json({
          status: 200,
          token: token,
          data: ADMIN_BAYYO,
          message: "Admin Singed In",
        });
      } else {
        const token = jwt.sign({ userId: ADMIN_RALF }, JWT_SECRET, {
          expiresIn: "1h",
        });
        res.status(200).json({
          status: 200,
          token: token,
          data: ADMIN_RALF,
          message: "Admin Singed In",
        });
      }
    }
  } else {
    console.log("incorrect username or password");
    res.status(404).json({
      status: 404,
      message: "incorrect  username or password ",
    });
  }
};

const getBarberDetails = async (req, res) => {};

module.exports = { signIn, verifyToken, getDashboard };
