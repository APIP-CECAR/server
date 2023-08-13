var cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const URL_CLIENT = process.env.URL_CLIENT;
const PORT_CLIENT = process.env.PORT_CLIENT;
module.exports = (app) => {
  // Middleware
  let port = PORT_CLIENT ? `:${PORT_CLIENT}` : "";
  const corsOptions = {
    origin: `${URL_CLIENT}${port}`,
    credentials: true,
  };

  let multimediaFolder = path.join(__dirname, "../", "files/multimedia");
  let h5pFolder = path.join(__dirname, "../", "files/h5p");

  app.use(cors(corsOptions));
  app.use(express.json({ limit: "25mb" }));
  app.use(express.urlencoded({ limit: "25mb", extended: true }));

  app.use(express.static("public"));
  app.use("/multimedia", express.static(multimediaFolder));
  app.use("/h5p", express.static(h5pFolder));

  app.use(bodyParser.json());
  app.use(passport.initialize());
};
