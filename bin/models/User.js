const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  name: String,
  surname: String,
  identification: String,
  ege: Number,
  program: String,
  isPlanning: {
    type: Boolean,
    default: false,
  },
  test: {
    type: Schema.Types.ObjectId,
    ref: "Test",
  },
  role: {
    type: String,
    default: "consumer",
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
