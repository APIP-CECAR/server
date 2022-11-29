const express = require("express");
const app = express();
const port = 5000;

// Import Middleware
require("./middleware")(app);

// Import Databases
require("./bin/database");
// Import routes
require("./routes/index")(app);

// server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
