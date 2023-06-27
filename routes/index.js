const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../files/uploads/"));
  },
  filename: function (req, file, cb) {
    // cb(null, `${Date.now()}-${file.originalname}`);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}.${file.originalname.split(".").pop()}`);
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

  // Upload files
  app.post("/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      res.send(error);
    }

    const data = {
      success: true,
      message: "File uploaded!",
      fileName: req.file.filename,
      fileSize: req.file.size,
      fileType: req.file.mimetype,
    };

    res.send(data);
  });
};
