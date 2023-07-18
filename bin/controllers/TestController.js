const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Test = require("../models/Test");
const Indicators = require("../models/Indicators");
const Dimensions = require("../models/Dimensions");
const User = require("../models/User");

const { saveUser, findUserByUsername } = require("./UserCotroller");
const async = require("async");
const fs = require("fs");
const test = require("../../routes/test");

const regex = /^(user)?(\w{4})$/;

exports.create = (req, res) => {
  const test = new Test({
    name: req.body.nombre,
    assesment: req.body.valoracion,
    percentile: req.body.percentil,
    date_init: req.body.horaInicio,
    date_end: req.body.horaFin,
    date: req.body.fecha,
  });

  test.save((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Test.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.findAll = (req, res) => {
  Test.find({}, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tests.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Test.findById(req.params.testId, (err, data) => {
    if (err) {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Test not found with id " + req.params.testId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving Test with id " + req.params.testId,
      });
    }

    if (!data) {
      return res.status(404).send({
        message: "Test not found with id " + req.params.testId,
      });
    }

    res.send(data);
  });
};

exports.update = (req, res) => {
  Test.findByIdAndUpdate(
    req.params.testId,
    {
      name: req.body.nombre,
      assesment: req.body.valoracion,
      percentile: req.body.percentil,
      date_init: req.body.horaInicio,
      date_end: req.body.horaFin,
      date: req.body.fecha,
    },
    { new: true },
    (err, data) => {
      if (err) {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "Test not found with id " + req.params.testId,
          });
        }
        return res.status(500).send({
          message: "Error updating Test with id " + req.params.testId,
        });
      }

      if (!data) {
        return res.status(404).send({
          message: "Test not found with id " + req.params.testId,
        });
      }

      res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Test.findByIdAndRemove(req.params.testId, (err, data) => {
    if (err) {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Test not found with id " + req.params.testId,
        });
      }
      return res.status(500).send({
        message: "Could not delete Test with id " + req.params.testId,
      });
    }

    if (!data) {
      return res.status(404).send({
        message: "Test not found with id " + req.params.testId,
      });
    }

    res.send({ message: "Test deleted successfully!" });
  });
};

exports.consumeData = (req, res) => {
  const { file, name } = req.body;
  const students = file.estudiantes["0"];
  const usersIds = [];

  async.eachSeries(
    Object.keys(students),
    (studentData, cbStudents) => {
      const student = students[studentData][0];
      let { nombre, apellido } = student;

      findUserByUsername(nombre, apellido).then((user) => {
        if (!user) {
          // Guardar usuario
          const tests = Object.values(student.tests[0]);
          test.name = name;

          saveUser({
            username: student.usuario
              ? student.usuario
              : generateRandomUsername(),
            password: student.contrasena,
            email: student.correo,
            name: student.nombre,
            surname: student.apellido,
            age: student.edad,
            program: student.carrera,
          }).then((newUser) => {
            usersIds.push(newUser._id);
            saveTests(tests, newUser._id)
              .then(() => cbStudents())
              .catch((err) => res.send(err));
          });
        } else {
          cbStudents();
        }
      });
    },
    (error) => {
      if (error) {
        res.status(500).json({ error: "Error al consumir los datos." });
      } else {
        res.status(200).send({ usersIds, studentsIsSaved: true });
      }
    }
  );
};

exports.getAllStudentsByIds = (req, res) => {
  let { ids } = req.body;
  ids = ids.map((id) => ObjectId(id));
  Test.find({ id_user: { $in: ids } })
    .populate({ path: "id_user", select: "name surname _id" })
    //.populate("id_user")
    // .populate("indicators")
    // .populate("dimensions")
    .then((tests) => {
      res.status(200).send({ tests });
    })
    .catch((err) => {
      res.status(500).send({ err });
    });
};

exports.getAllStudentsUnplanning = (req, res) => {
  User.find({ isPlanning: false, role: "consumer" })
    .then((users) => {
      res.status(200).send({ users });
    })

    .catch((err) => {
      res.status(500).send({ err });
    });
};

const saveTests = (tests, studentId) =>
  new Promise((resolve, reject) => {
    let arrIds = [];
    async.eachSeries(
      tests,
      (test, cbTests) => {
        saveTest(test, studentId).then((newTest) => {
          arrIds.push(newTest._id);
          cbTests();
        });
      },
      (err) => (err ? reject(err) : resolve(arrIds))
    );
  });

const saveTest = (data, userId) =>
  new Promise((resolve, reject) => {
    try {
      const [horaInicio, minutosInicio] = data.horaInicio.split(":");
      const [horaFin, minutosFin] = data.horaFin.split(":");

      const fechaInicio = new Date();
      fechaInicio.setHours(horaInicio);
      fechaInicio.setMinutes(minutosInicio);

      const fechaFin = new Date();
      fechaFin.setHours(horaFin);
      fechaFin.setMinutes(minutosFin);
      const test = new Test({
        name: data.nombre,
        id_user: userId,
        assesment: data.valoracion,
        percentile: data.percentil,
        date_init: fechaInicio,
        date_end: fechaFin,
        date: data.fecha,
      });
      let indicators = data.puntajeVariables[0].indicadores;
      let dimensions = data.puntajeVariables[0].dimensiones;

      test
        .save()
        .then((savedTest) => {
          saveDimensions(dimensions, savedTest._id).then((newDimension) => {
            saveIndicators(indicators, savedTest._id).then((newIndicators) => {
              Test.findByIdAndUpdate(savedTest._id, {
                dimensions: newDimension._id,
                indicators: newIndicators._id,
              }).then((updatedTest) => resolve(updatedTest));
            });
          });
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });

const saveIndicators = (data, testId) =>
  new Promise((resolve, reject) => {
    try {
      const indicators = new Indicators({
        id_test: testId,
        identify: data.identificar,
        make_known: data.dar_a_conocer,
        detect: data.detectar,
        analyze: data.analizar,
        list: data.listar,
        reflect: data.reflexionar,
        define: data.definir,
        relate: data.relacionar,
        diferentiate: data.difereciar,
        characterize: data.caracterizar,
        propose: data.proponer,
        associate: data.asociar,
      });

      indicators.save().then((savedIndicators) => {
        resolve(savedIndicators);
      });
    } catch (error) {
      reject(error);
    }
  });

const saveDimensions = (data, testId) =>
  new Promise((resolve, reject) => {
    try {
      const dimensions = new Dimensions({
        id_test: testId,
        observation: data.observacion,
        description: data.descripcion,
        comparison: data.comparacion,
        clasification: data.clasificacion,
      });

      dimensions.save().then((savedDimensions) => {
        resolve(savedDimensions);
      });
    } catch (error) {
      reject(error);
    }
  });
const generateRandomUsername = () => {
  const randomUsername = Math.random().toString(36).substring(2, 10);
  return `student.usuario${randomUsername}`;
};
