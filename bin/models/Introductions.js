const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IntroductionsSchema = new Schema({
  title: String,
  background: String,
  hiper_objects: [],
});

module.exports = mongoose.model("Introductions", IntroductionsSchema);
