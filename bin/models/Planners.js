const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlannerSchema = new Schema({
  name: String,
  action: String,
  description: String,
  domain: String,
  plan: String,
  history: {
    type: Schema.Types.ObjectId,
    ref: "History",
  },
});

module.exports = mongoose.model("Planner", PlannerSchema);
