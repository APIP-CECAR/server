const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
  name: String,
  competence: String,
  introductions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Introductions",
    },
  ],
  scenes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Scenes",
    },
  ],
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

HistorySchema.pre(/^find/, function (next) {
  this.populate(["introductions", "scenes"]);
  next();
});

module.exports = mongoose.model("History", HistorySchema);
