const History = require("../models/History");
const Introductions = require("../models/Introductions");
const Scenes = require("../models/Scenes");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  let { name, competence } = req.body;

  // Create a History
  const history = new History({ name, competence });
  // Save History in the database
  history
    .save()
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the History.",
      });
    });
};

exports.findAll = (req, res) => {
  History.find()
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving History.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  History.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found History with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving History with id=" + id });
    });
};

exports.update = (req, res) => {
  // console.log(req.body);
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a History
  const history = req.body;

  History.findByIdAndUpdate(history._id, history, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update History with id=${id}. Maybe History was not found!`,
        });
      } else res.send({ message: "History was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating History with id=" + id,
      });
    });
};

// Update a introduction with historyId on History put("/history/:id/introduction"
exports.addIntroduction = (req, res) => {
  // Validate request
  if (!req.body.introduction) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create new introduction
  const newIntroduction = new Introductions(req.body.introduction);

  // Save the new introduction
  newIntroduction
    .save()
    .then((createdIntroduction) => {
      // Update the history document with the new introduction

      return History.findByIdAndUpdate(
        req.params.id,
        { $push: { introductions: createdIntroduction._id } },
        { useFindAndModify: false }
      );
    })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update History with id=${req.params.id}. Maybe History was not found!`,
        });
      } else {
        res.send({
          message: "Introduction was added to History successfully.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Error adding introduction to History with id=" + req.params.id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  History.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete History with id=${id}. Maybe History was not found!`,
        });
      } else {
        res.send({
          message: "History was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete History with id=" + id,
      });
    });
};
// Update a introduction with intrpductionId
exports.updateIntroduction = (req, res) => {
  // Validate request
  if (!req.body.introduction) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  let { _id, title, background, hiper_objects } = req.body.introduction;

  // Create a introduction

  Introductions.findByIdAndUpdate(
    req.params.id,
    { title, background, hiper_objects },
    {
      useFindAndModify: false,
      new: true,
    }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Introduction with id=${req.params.id}. Maybe Introduction was not found!`,
          success: false,
        });
      } else
        res.send({
          message: "Introduction was updated successfully.",
          data,
          success: true,
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Introduction with id=" + req.params.id,
        success: false,
      });
    });
};

exports.deleteIntroduction = (req, res) => {
  const id = req.params.id;

  Introductions.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Introduction with id=${id}. Maybe Introduction was not found!`,
        });
      } else {
        // Update History removing introduction deleted
        History.findByIdAndUpdate(
          req.params.historyId,
          { $pull: { introductions: id } },
          { useFindAndModify: false }
        ).then((data) => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update History with id=${req.params.historyId}. Maybe History was not found!`,
            });
          } else {
            res.send({
              message: "Introduction was deleted successfully!",
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Introduction with id=" + id,
      });
    });
};
