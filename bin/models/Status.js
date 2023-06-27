const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StatusSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  test: {
    type: Schema.Types.ObjectId,
    ref: "Test",
  },
  observation: {
    n1obs1: false,
    n1obs2: false,
    n1obs3: false,
  },
  comparison: {
    n1com1: false,
    n1com2: false,
    n1com3: false,
  },
  clasification: {
    n1cla1: false,
    n1cla2: false,
    n1cla3: false,
  },
  description: {
    n1des1: false,
    n1des2: false,
    n1des3: false,
  },
});

module.exports = mongoose.model("Status", StatusSchema);
