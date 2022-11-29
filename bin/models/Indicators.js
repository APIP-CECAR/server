const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IndicatorsSchema = new Schema({
  id_test: {
    type: Schema.Types.ObjectId,
    ref: "Test",
  },
  identify: Object,
  make_known: Object,
  detect: Object,
  analyze: Object,
  list: Object,
  reflect: Object,
  define: Object,
  relate: Object,
  diferentiate: Object,
  characterize: Object,
  propose: Object,
  associate: Object,
});
