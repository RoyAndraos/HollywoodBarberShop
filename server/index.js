"use strict";

const express = require("express");
const morgan = require("morgan");
const {
  getWebsiteInfo,
  deleteReservation,
  getReservations,
  addReservation,
  getSlideShowImages,
  getReservationById,
  getReservationForDelete,
} = require("./server");
const PORT = process.env.PORT || 4000;
const cors = require("cors");
express()
  .use((req, res, next) => {
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
  .use(cors())
  .use(morgan("tiny"))
  .use(express.json())
  .use(express.static("public"))
  .get("/getWebsiteInfo", getWebsiteInfo)
  .get("/getReservationForDelete/:_id", getReservationForDelete)
  .get("/getReservations", getReservations)
  .get("/getSlideShowImages", getSlideShowImages)
  .get("/getRes/:_id", getReservationById)
  .post("/addReservation", addReservation)
  .delete("/deleteReservation", deleteReservation)
  .listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
