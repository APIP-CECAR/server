const Scenes = require("../models/Scenes");

// CRUD operations for Scenes

// Create and Save a new Scenes
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Scenes
  // zconsole.log("Scene", req.body);
  let scenes = new Scenes(req.body);

  // Save Scenes in the database
  scenes
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Scenes.",
      });
    });
};

// Retrieve all Sceness from the database.
exports.findAll = (req, res) => {
  Scenes.find()
    .then((Sceness) => {
      res.send(Sceness);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving scenes.",
      });
    });
};

// Find a single Scenes with a scenesId
exports.findOneById = (req, res) => {
  Scenes.findById(req.params.scenesId)
    .then((scenes) => {
      if (!scenes) {
        return res.status(404).send({
          message: "Scenes not found with id " + req.params.scenesId,
        });
      }
      res.send(scenes);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Scenes not found with id " + req.params.scenesId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving scenes with id " + req.params.scenesId,
      });
    });
};

// Update a Scenes identified by the scenesId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Find Scenes and update it with the request body
  Scenes.findByIdAndUpdate(
    req.params.scenesId,
    {
      name: req.body.name,
      description: req.body.description,
      domain: req.body.domain,
      problem: req.body.problem,
    },
    { new: true }
  )
    .then((scenes) => {
      if (!scenes) {
        return res.status(404).send({
          message: "Scenes not found with id " + req.params.scenesId,
        });
      }
      res.send(scenes);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Scenes not found with id " + req.params.scenesId,
        });
      }
      return res.status(500).send({
        message: "Error updating scenes with id " + req.params.scenesId,
      });
    });
};

// Delete a Scenes with the specified scenesId in the request
exports.delete = (req, res) => {
  Scenes.findByIdAndRemove(req.params.scenesId)
    .then((scenes) => {
      if (!scenes) {
        return res.status(404).send({
          message: "Scenes not found with id " + req.params.scenesId,
        });
      }
      res.send({ message: "Scenes deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Scenes not found with id " + req.params.scenesId,
        });
      }
      return res.status(500).send({
        message: "Could not delete scenes with id " + req.params.scenesId,
      });
    });
};
