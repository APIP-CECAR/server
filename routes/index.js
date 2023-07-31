const multer = require("multer");
const path = require("path");
const unzipper = require("unzipper");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.originalname.endsWith(".h5p")) {
      cb(null, path.join(__dirname, "../files/h5p/"));
    } else {
      cb(null, path.join(__dirname, "../files/uploads/"));
    }
  },
  filename: function (req, file, cb) {
    if (file.originalname.endsWith(".h5p")) {
      const fileNameWithoutExtension = file.originalname.split(".h5p")[0];
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}-${fileNameWithoutExtension}.zip`);
    } else {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}.${file.originalname.split(".").pop()}`);
    }
  },
});

const upload = multer({ storage });
module.exports = (app) => {
  // Import routes User
  const users = require("./users")(app);
  // Import routes Planner
  const planner = require("./planner")(app);
  // Import routes History
  const history = require("./history")(app);
  // Import routes Test
  const test = require("./test")(app);
  // Import Scenes
  const scenes = require("./scenes")(app);
  // Import ActivitiesH5P
  const activitiesH5P = require("./activitiesH5P")(app);

  // Upload files
  app.post("/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      console.log(error);
      res.send(error);
    }

    // Verificamos si es un archivo H5P
    if (req.file && req.file.originalname.endsWith(".h5p")) {
      // Ruta del archivo zip que se subió
      const zipFilePath = req.file.path;

      // Carpeta donde se descomprimirá el archivo
      const unzipDestination = path.join(
        __dirname,
        "../files/h5p/",
        req.file.originalname.split(".h5p")[0] // Usamos el nombre sin extensión como nombre de la carpeta
      );

      // Descomprimir el archivo H5P
      const stream = fs
        .createReadStream(zipFilePath)
        .pipe(unzipper.Extract({ path: unzipDestination }));

      stream.on("finish", () => {
        // Eliminar el archivo zip después de la descompresión
        fs.unlink(zipFilePath, (err) => {
          if (err) {
            console.error("Error al eliminar el archivo zip:", err);
          } else {
            // console.log("Archivo zip eliminado correctamente.");
            const data = {
              success: true,
              message: "File uploaded!",
              fileName: req.file.originalname.split(".h5p")[0],
              fileSize: req.file.size,
              fileType: req.file.mimetype,
            };

            res.send(data);
          }
        });
      });

      stream.on("error", (err) => {
        console.error("Error al descomprimir el archivo H5P:", err);
        res.status(500).send("Error al descomprimir el archivo H5P.");
      });
    } else if (req.file && !req.file.originalname.endsWith(".h5p")) {
      const data = {
        success: true,
        message: "File uploaded!",
        fileName: req.file.filename,
        fileSize: req.file.size,
        fileType: req.file.mimetype,
      };

      res.send(data);
    } else {
      res.status(400).send("El archivo subido no es un archivo H5P válido.");
    }
  });
};
