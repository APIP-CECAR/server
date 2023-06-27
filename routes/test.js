const TestController = require("../bin/controllers/TestController");
module.exports = (app) => {
  // Create a new Test
  app.post("/tests", TestController.create);

  // Retrieve all Tests
  app.get("/tests", TestController.findAll);

  // Retrieve a single Test with testId
  app.get("/tests/:testId", TestController.findOne);

  // Update a Test with testId
  app.put("/tests/:testId", TestController.update);

  // Delete a Test with testId
  app.delete("/tests/:testId", TestController.delete);

  // Consume test data from API Test
  app.post("/consumeData", TestController.consumeData);

  // Get Users by ids
  app.post("/get_all_students_by_ids", TestController.getAllStudentsByIds);

  // Get users unplanning
  app.get(
    "/get_all_students_unplanning",
    TestController.getAllStudentsUnplanning
  );
};
