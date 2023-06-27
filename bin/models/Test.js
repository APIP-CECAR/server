const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestSchema = new Schema({
  name: String,
  id_user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  assesment: Number,
  percentile: String,
  date_init: Date,
  date_end: Date,
  date: Date,
  indicators: {
    type: Schema.Types.ObjectId,
    ref: "Indicators",
  },
  dimensions: {
    type: Schema.Types.ObjectId,
    ref: "Dimensions",
  },
});

module.exports = mongoose.model("Test", TestSchema);
