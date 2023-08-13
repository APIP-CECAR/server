const Planner = require("../models/Planners");
const User = require("../models/User");
const History = require("../models/History");
const cecarits = require("../apis/cecarits");
const interpreter = require("../apis/cecarits/interpreter");

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
  let { ids, history } = req.body;
  console.log(ids, history);
  cecarits
    .processIds(ids, history)
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

// get al plans
exports.findAll = (req, res) => {
  Planner.find()
    .then((planners) => {
      res.send("plannners", planners);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving plans.",
      });
    });
};

// get plan by Ids
exports.findOneById = (req, res) => {
  Planner.findById(req.params.plannerId)
    .then((planner) => {
      if (!planner) {
        return res.status(404).send({
          message: "Planner not found with id " + req.params.plannerId,
        });
      }
      res.send(planner);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Planner not found with id " + req.params.plannerId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving planner with id " + req.params.plannerId,
      });
    });
};

// get all students planned isPlanning
exports.findStudentsPlanned = (req, res) => {
  User.find({ isPlanning: true })
    .select("_id name surname")
    .populate({
      path: "plans",
      populate: {
        path: "history",
        select: "name",
      },
    })
    .then((students) => {
      if (students.length > 0) {
        let plans = interpreter(translatePlans(students));
        res.send({ students, plans });
      } else {
        res.send([]);
      }
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      })
    );
};

exports.findStudentPlan = (req, res) => {
  // console.log(req.params.idStudent);
  User.findById(req.params.idStudent)
    .select("_id name surname")
    .populate({
      path: "plans",
      populate: {
        path: "history",
        select: "name",
      },
    })
    .then((student) => {
      let plans = interpreter(translatePlans([student]));
      res.send({ student, plans });
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      })
    );
};

// translate Plans to actions
function translatePlans(students) {
  // process students to translate plans interpreter
  let plans = [];
  students.forEach(
    (student) => (plans = plans.concat(student.plans.map((p) => p.plan)))
  );
  return plans;
}
