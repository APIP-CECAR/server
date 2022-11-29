const Dimensions = require("../models/Dimension.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  let { id_test, observar, describir, comparar, clasificar } = req.body;
  // Create a Indicators
  let dimensions = new Dimensions({
    id_test: id_test,
    observation: observar,
    description: describir,
    comparison: comparar,
    clasification: clasificar,
  });

  // Save Indicators in the database
  dimensions
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
