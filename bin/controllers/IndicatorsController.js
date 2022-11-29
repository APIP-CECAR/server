const Indicators = require("../models/Indicators");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  let {
    id_test,
    identificar,
    dar_a_conocer,
    detectar,
    analizar,
    listar,
    reflexionar,
    definir,
    relacionar,
    diferenciar,
    caracterizar,
    proponer,
    asociar,
  } = req.body;
  // Create a Indicators
  let indicators = new Indicators({
    id_test: id_test,
    identify: identificar,
    make_known: dar_a_conocer,
    detect: detectar,
    analyze: analizar,
    list: listar,
    reflect: reflexionar,
    define: definir,
    relate: relacionar,
    diferentiate: diferenciar,
    characterize: caracterizar,
    propose: proponer,
    associate: asociar,
  });

  // Save Indicators in the database
  indicators
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Indicators.",
      });
    });
};
