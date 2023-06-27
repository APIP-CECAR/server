/* `const express = require("express");` is importing the Express.js framework into the JavaScript
file. Express.js is a popular Node.js web application framework that provides a set of features for
building web and mobile applications. */
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
app.listen(port, () => console.log(`CECAR app listening on port ${port}!`));
