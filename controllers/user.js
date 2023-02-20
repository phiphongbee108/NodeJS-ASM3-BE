const Product = require("../models/product");
const User = require("../models/user");
const Order = require("../models/order");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

exports.getCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user.cart.items);
  } catch (err) {
    next(err);
  }
};
exports.postCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const count = req.body.count;

    const product = await Product.findById(req.body.productId);

    user.addToCart(product, count);
    return res.status(200).json("Add To Cart Thanh Cong");
  } catch (err) {
    next(err);
  }
};
exports.updateCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const count = req.body.count;

    const product = await Product.findById(req.body.productId);
    console.log(product);
    user.updateCart(product, count);

    return res.status(200).json("Update Cart Thanh Cong");
  } catch (err) {
    next(err);
  }
};
exports.deleteCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(user);
    console.log(req.body);
    const product = await Product.findById(req.body.productId);
    console.log(product);
    user.deleteCartItem(product);
    return res.status(200).json("Delete Cart Thanh Cong");
  } catch (err) {
    next(err);
  }
};
exports.postOrder = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.userId);
    //console.log(req.body);
    const newOrder = await new Order(req.body);
    user.clearCart();
    //console.log(newOrder);
    newOrder.save();
    transporter.sendMail({
      to: "thonqfx17090@funix.edu.vn",
      from: "thonqfx17090@funix.edu.vn",
      subject: "hhhh",
      text: "Hello world!", // plain text body
      // html body
    });
    return res.status(200).json("Order Thành Công");

    // return res.status(200).json("Order Thanh cong");
  } catch (err) {
    next(err);
  }
};
exports.getOrders = async (req, res, next) => {
  try {
    const order = await Order.find();
    return res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};
exports.getOrder = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const orders = await Order.find();

    const order = orders.filter((order) => order.userId.toString() === userId);
    return res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};
exports.getOrderDetail = async (req, res, next) => {
  try {
    const userId = req.params.userid;
    const detailId = req.params.detailid;
    const orders = await Order.find();

    const order = orders.filter((order) => order.userId.toString() === userId);
    const detail = order.filter((order) => order._id.toString() === detailId);
    return res.status(200).json(detail);
  } catch (err) {
    next(err);
  }
};
