"use strict";

const express = require("express");
const morgan = require("morgan");
const {
  getBarberInfo,
  getWebsiteInfo,
  deleteReservation,
  getReservations,
  addReservation,
  getReservationById,
  getBarbersData,
  getAboutInfo,
  getMenuData,
  getHomePageInfo,
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
  .get("/getHomePage", getHomePageInfo)
  .get("/getMenu", getMenuData)
  .get("/getBarbers", getBarbersData)
  .get("/getAbout", getAboutInfo)
  .get("/getBarberInfo", getBarberInfo)
  .get("/getWebsiteInfo", getWebsiteInfo)
  .get("/getReservations", getReservations)
  .get("/getRes/:_id", getReservationById)
  .post("/addReservation", addReservation)
  .delete("/deleteReservation", deleteReservation)
  .listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
