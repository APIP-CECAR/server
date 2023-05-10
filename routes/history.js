const HistoryController = require("../bin/controllers/HistoryController");

module.exports = (app) => {
  // Create a new History
  app.post("/history", HistoryController.create);
  // Retrieve all Histories
  app.get("/history", HistoryController.findAll);
  // Retrieve a single History with historyId
  app.get("/history/:id", HistoryController.findOne);
  // Update a History with historyId
  app.put("/history/:id", HistoryController.update);
  // Update a introduction with historyId on History
  app.put("/history/:id/introduction", HistoryController.addIntroduction);
  // Update a introduction with intrpductionId
  app.put("/introduction/:id", HistoryController.updateIntroduction);
  // Delete a History with historyId
  app.delete("/history/:id", HistoryController.delete);
  app.delete(
    "/history/:historyId/introduction/:id",
    HistoryController.deleteIntroduction
  );
};
