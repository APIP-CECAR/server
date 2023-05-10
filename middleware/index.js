var cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

module.exports = (app) => {
  // Middleware
  app.use(cors());
  app.use(express.json({ limit: "25mb" }));
  app.use(express.urlencoded({ limit: "25mb", extended: true }));
  app.use(express.static("public"));
  // app.use( "/files", express.static(path.join(__dirname, "../", "files/uploads")));
  app.use(
    "/uploads",
    express.static(path.join(__dirname, "../", "files/uploads"))
  );
  app.use(bodyParser.json());
  app.use(passport.initialize());
};
