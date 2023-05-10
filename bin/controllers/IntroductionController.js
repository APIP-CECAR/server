const Introduction = require("../models/Introduction");

// CRUD operations for Introduction

// Create and Save a new Introduction
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  let { name, description, domain, problem } = req.body;
  // Create a Introduction
  let introduction = new Introduction({
    name,
    description,
    domain,
    problem,
  });

  // Save Introduction in the database
  introduction
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Introduction.",
      });
    });
};

// Retrieve all Introductions from the database.
exports.findAll = (req, res) => {
  Introduction.find()
    .then((introductions) => {
      res.send(introductions);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving introductions.",
      });
    });
};

// Find a single Introduction with a introductionId
exports.findOne = (req, res) => {
  Introduction.findById(req.params.introductionId)
    .then((introduction) => {
      if (!introduction) {
        return res.status(404).send({
          message:
            "Introduction not found with id " + req.params.introductionId,
        });
      }
      res.send(introduction);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message:
            "Introduction not found with id " + req.params.introductionId,
        });
      }
      return res.status(500).send({
        message:
          "Error retrieving introduction with id " + req.params.introductionId,
      });
    });
};

// Update a Introduction identified by the introductionId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Find introduction and update it with the request body
  Introduction.findByIdAndUpdate(
    req.params.introductionId,
    {
      name: req.body.name,
      description: req.body.description,
      domain: req.body.domain,
      problem: req.body.problem,
    },
    { new: true }
  )
    .then((introduction) => {
      if (!introduction) {
        return res.status(404).send({
          message:
            "Introduction not found with id " + req.params.introductionId,
        });
      }
      res.send(introduction);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message:
            "Introduction not found with id " + req.params.introductionId,
        });
      }
      return res.status(500).send({
        message:
          "Error updating introduction with id " + req.params.introductionId,
      });
    });
};

// Delete a Introduction with the specified introductionId in the request
exports.delete = (req, res) => {
  Introduction.findByIdAndRemove(req.params.introductionId)
    .then((introduction) => {
      if (!introduction) {
        return res.status(404).send({
          message:
            "Introduction not found with id " + req.params.introductionId,
        });
      }
      res.send({ message: "Introduction deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message:
            "Introduction not found with id " + req.params.introductionId,
        });
      }
      return res.status(500).send({
        message:
          "Could not delete introduction with id " + req.params.introductionId,
      });
    });
};
