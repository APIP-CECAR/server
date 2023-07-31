const User = require("../models/User");
const Status = require("../models/Status");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
var path = require("path");

//Save user from test
exports.saveUser = (newUser) =>
  new Promise((resolve, reject) => {
    const user = new User(newUser);
    user
      .save()
      .then((user) => resolve(user))
      .catch((error) => reject(false));
  });

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  let { username, email, password, role } = req.body;

  password = password || generateRandomPassword(16);
  // Create a User
  let user = new User({
    username,
    password,
    email,
    role,
  });

  // Hash password before saving in database
  bcrypt.genSalt(10, function (err, salt) {
    // To hash the password
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) throw err;
      // Set password to hashed
      user.password = hash;
      // Save User in the database
      user
        .save()
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the User.",
          });
        });
    });
  });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  User.find({}, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else res.send(data);
  });
};

// Find a single User with a userId (id)
exports.findOne = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.userId,
        });
      }
    } else res.send(data);
  });
};

// Update a User identified by the userId (id) in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  User.updateOne({ _id: req.params.userId }, req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating User with id " + req.params.userId,
        });
      }
    } else res.send(data);
  });
};

// Delete a User with the specified userId (id) in the request
exports.delete = (req, res) => {
  User.deleteOne({ _id: req.params.userId }, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.userId,
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};

// Login
exports.login = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  let { username, password } = req.body;

  // Find user by username
  User.findOne({ username }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ usernamenotfound: "Usename not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      // User matched
      if (isMatch) {
        // Create JWT Payload
        fs.readFile(
          path.join(__dirname, "../keys/private.key"),
          "utf8",
          (err, privateKey) => {
            if (err) throw err;
            let payload = {
              id: user._id,
              name: user.username,
              rol: user.role,
            };

            // Sign token
            jwt.sign(
              payload,
              privateKey,
              {
                expiresIn: 31556926, // 1 year in seconds
                algorithm: "RS256",
              },
              (err, token) => {
                if (err) throw err;
                res.json({
                  success: true,
                  token: "Bearer " + token,
                });
              }
            );
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
};

// Logout
exports.logout = (req, res) => {
  let authorization = req.headers["authorization"];
  if (!authorization) {
    res.status(403).json({ message: "No token provided" });
  } else {
    let token = authorization.split(" ")[1];
    jwt.sign(token, "", { expiresIn: 1 }, (logout, err) => {
      if (logout) {
        res.send({ msg: "You have been Logged Out" });
      } else {
        res.send({ msg: "Error" });
      }
    });
  }
};

// Get user
exports.user = (req, res) => {
  let bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const bearer = bearerHeader.split(" ");
  const token = bearer[1];

  fs.readFile(
    path.join(__dirname, "../keys/public.key"),
    "utf8",
    (err, privateKey) => {
      if (err) {
        console.error("Error reading private key:", err);
        return res.status(500).json({ message: "Failed to verify token" });
      }

      jwt.verify(token, privateKey, (err, user) => {
        if (err) {
          console.error("Error verifying token:", err);
          return res.status(401).json({ message: "Invalid token" });
        } else {
          res.status(200).json({ user });
        }
      });
    }
  );
};

// Get status of students
exports.getStatus = (req, res) => {
  let student = req.params.studentId;
  Status.findOne({ student }, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving status.",
      });
    else res.send(data);
  });
};

// find user by username
exports.findUserByUsername = (name, surname) =>
  new Promise((resolve, reject) =>
    User.findOne({ name, surname })
      .then((user) => resolve(user))
      .catch((error) => reject(error))
  );

exports.generate = (req, res) => {
  // Obtener la cadena de la contraseña desde el cuerpo de la solicitud
  const passwordToHash = req.body.password;

  // Generar el salt para el algoritmo bcrypt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return res.status(500).send({
        message: "Error generating salt.",
      });
    }

    // Hash de la contraseña
    bcrypt.hash(passwordToHash, salt, function (err, hash) {
      if (err) {
        return res.status(500).send({
          message: "Error generating password hash.",
        });
      }

      // Devolver el hash de la contraseña
      res.send({
        hashedPassword: hash,
      });
    });
  });
};

function generateRandomPassword(length) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}
