const ActivitiesH5P = require("../bin/controllers/ActivitiesH5PController");

module.exports = (app) => {
  // Process a ActivitiesH5P
  app.post("/activitiesH5P", ActivitiesH5P.processActivities);
};
