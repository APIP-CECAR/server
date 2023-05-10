const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlannerSchema = new Schema({
  name: String,
  description: String,
  domain: String,
  plann: [],
  history: [],
});

module.exports = mongoose.model("Planner", PlannerSchema);
