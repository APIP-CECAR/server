const Status = require("../models/Status");
// set true value to Update on status model competences skill
exports.processActivities = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  let { studentId, competence, skill, value, statement } = req.body;

  let update = {
    $set: {
      [`${competence}.${skill}`]: true,
    },
  };

  // Update Status in the database
  Status.findOneAndUpdate(
    {
      student: studentId,
    },
    update,
    { new: true, upsert: true }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating the Status.",
      });
    });
};
