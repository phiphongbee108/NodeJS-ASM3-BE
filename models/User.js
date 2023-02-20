const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  role: { type: String, default: "user", require: true },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  fullname: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  cart: {
    items: [
      {
        product: { type: Object, required: true },

        quantity: { type: Number, require: true },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product, count) {
  const cartProduct = this.cart.items.findIndex((cb) => {
    return cb.product._id.toString() === product._id.toString();
  });

  let newQuantity = count;
  const updatedCartItem = [...this.cart.items];
  if (cartProduct >= 0) {
    newQuantity = Number(this.cart.items[cartProduct].quantity) + Number(count);
    updatedCartItem[cartProduct].quantity = newQuantity;
  } else {
    updatedCartItem.push({
      quantity: newQuantity,
      product: product,
    });
  }

  const updatedCart = {
    items: updatedCartItem,
  };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.updateCart = function (product, count) {
  const cartProduct = this.cart.items.findIndex((cb) => {
    return cb.product._id.toString() === product._id.toString();
  });
  const updatedCartItem = [...this.cart.items];
  updatedCartItem[cartProduct].quantity = count;
  const updatedCart = {
    items: updatedCartItem,
  };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.deleteCartItem = function (product) {
  const updatedItems = this.cart.items.filter((item) => {
    return item.product._id.toString() !== product._id.toString();
  });
  this.cart.items = updatedItems;
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
