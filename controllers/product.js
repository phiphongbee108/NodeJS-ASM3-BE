const Product = require("../models/product");

exports.getProducts = async (req, res, next) => {
  try {
    const product = await Product.find();

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};
exports.addProduct = async (req, res, next) => {
  try {
    const newProduct = new Product(req.body);

    newProduct.save();
    res.json(newProduct);
  } catch (err) {
    next(err);
  }
};
exports.deleteProduct = async (req, res, next) => {
  try {
    const query = req.query.p;
    await Product.findByIdAndDelete(query);

    res.json("Delete Thanh Cong");
  } catch (err) {
    next(err);
  }
};
exports.editProduct = async (req, res, next) => {
  try {
    const query = req.query.p;
    const updated = await Product.findByIdAndUpdate(
      query,
      { $set: req.body },
      { new: true }
    );

    res.json("Edit Thanh Cong");
  } catch (err) {
    next(err);
  }
};

exports.searchProduct = async (req, res, next) => {
  try {
    const query = req.query.product;
    const product = await Product.find();
    const search = product.filter((prod) =>
      prod.category.toLowerCase().includes(query.toLowerCase())
    );
    res.status(200).json(search);
  } catch (err) {
    next(err);
  }
};
