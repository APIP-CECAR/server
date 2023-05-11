const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestSchema = new Schema({
  name: String,
  id_iser: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  assesment: Number,
  percentile: String,
  date_init: Date,
  date_end: Date,
  date: Date,
  indicators: {
    type: OSchema.Types.ObjectId,
    ref: "Indicator",
  },
  dimensions: {
    type: OSchema.Types.ObjectId,
    ref: "Dimension",
  },
});

module.exports = mongoose.model("Test", TestSchema);
