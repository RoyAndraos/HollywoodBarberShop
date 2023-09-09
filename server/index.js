"use strict";

const express = require("express");
const morgan = require("morgan");
const {
  getBarberInfo,
  addContact,
  getWebsiteInfo,
  sendEmail,
  addClient,
  login
} = require("./server");
const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.json())
  .use(express.static("public"))
  .get("/getBarberInfo", getBarberInfo)
  .get("/getWebsiteInfo", getWebsiteInfo)
  .post("/addContact", addContact)
  .post("/sendEmail", sendEmail)
  .post("/signup", addClient)
  .post("/login", login)
  .listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
