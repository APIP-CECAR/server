var cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

module.exports = (app) => {
  // Middleware
  const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
  };

  let uploadsFolder = path.join(__dirname, "../", "files/uploads");
  let h5pFolder = path.join(__dirname, "../", "files/h5p");

  app.use(cors(corsOptions));
  app.use(express.json({ limit: "25mb" }));
  app.use(express.urlencoded({ limit: "25mb", extended: true }));

  app.use(express.static("public"));
  app.use("/uploads", express.static(uploadsFolder));
  app.use("/h5p", express.static(h5pFolder));

  app.use(bodyParser.json());
  app.use(passport.initialize());
};
