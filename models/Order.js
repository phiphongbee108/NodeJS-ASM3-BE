const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  products: [],
  total: { type: Number, require: true },

  userId: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
});

module.exports = mongoose.model("Order", orderSchema);
