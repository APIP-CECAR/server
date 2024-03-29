const PlannerController = require("../bin/controllers/PlannerController");

module.exports = (app) => {
  // Retrieve students planed
  app.get("/planner/students", PlannerController.findStudentsPlanned);
  // Retrieve student plan
  app.get("/planner/student/:idStudent", PlannerController.findStudentPlan);
  // Create a new Planner
  app.post("/planner", PlannerController.create);
  // Create a new Planner
  app.post("/generate_plan", PlannerController.generate_plan);

  // Retrieve all Planners
  app.get("/planner", PlannerController.findAll);
  // Retrieve a single Planner with plannerId
  app.get("/planner/:plannerId", PlannerController.findOneById);

  /*
  // Update a Planner with plannerId
  app.put("/planner/:plannerId", PlannerController.update);
  // Delete a Planner with plannerId
  app.delete("/planner/:plannerId", PlannerController.delete);
  */
};
