const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlannerSchema = new Schema({
  name: String,
  action: String,
  description: String,
  domain: String,
  plan: String,
});

module.exports = mongoose.model("Planner", PlannerSchema);
