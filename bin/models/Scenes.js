const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScenesSchema = new Schema({
  title: String,
  background: String,
  hiper_objects: {}, // Pensa convertir en array.
  level: String,
  competence: String,
  skill: String,
  minigame: [],
});

module.exports = mongoose.model("Scenes", ScenesSchema);
