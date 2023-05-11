const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DimensionsSchema = new Schema({
  id_test: {
    type: Schema.Types.ObjectId,
    ref: "Test",
  },
  observation: Object,
  description: Object,
  comparison: Object,
  clasification: Object,
});

module.exports = mongoose.model("Dimensions", DimensionsSchema);
