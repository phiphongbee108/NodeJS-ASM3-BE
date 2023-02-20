const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  category: {
    type: "string",
    required: true,
  },
  name: {
    type: "String",
    required: true,
  },
  price: {
    type: "Number",
    required: true,
  },
  img1: {
    type: "String",
    required: true,
  },
  img2: {
    type: "String",
    required: true,
  },
  img3: {
    type: "String",
    required: true,
  },
  img4: {
    type: "String",
    required: true,
  },

  long_desc: {
    type: "String",
    required: true,
  },
  short_desc: {
    type: "String",
    required: true,
  },
});
module.exports = mongoose.model("product", ProductSchema);
