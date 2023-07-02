const Planner = require("../models/Planners");
const cecarits = require("../apis/cecarits");

// Create and Save a new Planner
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  let { name, description, domain, problem } = req.body;
  // Create a Planner
  let planner = new Planner({
    name,
    description,
    domain,
    problem,
  });

  // Save Planner in the database
  planner
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Planner.",
      });
    });
};

// Generate a plan
exports.generate_plan = (req, res) => {
  let { ids } = req.body;
  cecarits
    .processIds(ids)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Planner.",
      });
    });
};
