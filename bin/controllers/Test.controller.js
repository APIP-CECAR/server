const Test = require("../models/Test");
const Indicators = require("../models/Indicators");
const Dimensions = require("../models/Dimensions");
const mongoose = require("mongoose");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  let id_test = mongoose.Schema.Types.ObjectId();
  let indicators = req.body.puntajeVariables.indicadores;
  indicators.id_test = id_test;

  Indicators.create(indicators, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Indicators.",
      });
    } else {
      let dimensions = req.body.puntajeVariables.dimensiones;
      dimensions.id_test = id_test;
      Dimensions.create(dimensions, (err, data) => {
        if (err) {
          res.status(500).send({
            message:
              err.message ||
              "Some error occurred while creating the Dimensions.",
          });
        } else {
          let {
            nombre,
            id_user,
            valoracion,
            percentil,
            horaInicio,
            horaFin,
            fecha,
            id_indicadores,
            id_dimensiones,
          } = req.body;
          let test = new Test({
            name: nombre,
            id_user: id_user,
            assesment: valoracion,
            percentile: percentil,
            date_init: horaInicio,
            date_end: horaFin,
            date: fecha,
            indicators: id_indicadores,
            dimensions: id_dimensiones,
          });
          test
            .save()
            .then((data) => {
              res.send(data);
            })
            .catch((err) => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the Test.",
              });
            });
        }
      });
    }
  });
};
