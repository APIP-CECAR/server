const ScenesController = require("../bin/controllers/ScenesController");
module.exports = (app) => {
  // Retrieve scenes
  app.get("/scenes", ScenesController.findAll);
  // Retrieve a single scenes with scenesId
  app.get("/scene/:id", ScenesController.findOneById);
  // Create a new scenes
  app.post("/scenes", ScenesController.create);
  // Update a scenes with scenesId
  app.put("/scenes/:scenesId", ScenesController.update);
  // Delete a scenes with scenesId
  app.delete("/scenes/:scenesId", ScenesController.delete);
};
