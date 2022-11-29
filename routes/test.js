const TestControler = require("../controllers/test");
module.exports = (app) => {
  // Create a new Test
  app.post("/tests", TestControler.create);

  // Retrieve all Tests
  app.get("/tests", TestControler.findAll);

  // Retrieve a single Test with testId
  app.get("/tests/:testId", TestControler.findOne);

  // Update a Test with testId
  app.put("/tests/:testId", TestControler.update);

  // Delete a Test with testId
  app.delete("/tests/:testId", TestControler.delete);
};
