const jwt = require("jsonwebtoken");
const fs = require("fs");
var path = require("path");

const validateAuth = async (req, res, next) => {
  if (req.header("Authorization") !== undefined) {
    const token = req.header("Authorization").replace("Bearer ", "");
    fs.readFile(
      path.join(__dirname, "../bin/keys/public.key"),
      "utf8",
      async (err, publicKey) => {
        if (err) throw err;
        try {
          const data = jwt.verify(token, publicKey);

          next();
        } catch (error) {
          res
            .status(401)
            .send({ error: "No está autorizado para acceder a este recurso" });
        }
      }
    );
  } else {
    res.status(401).send({ error: "No se ha enviado una autorizacion" });
  }
};

module.exports = validateAuth;
