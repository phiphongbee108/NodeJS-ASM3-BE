const express = require("express");
const basicAuthController = require("../middewere/basicAuth");
const productController = require("../controllers/product");

const router = express.Router();

router.get("/", productController.getProducts);
router.post(
  "/addproduct/:id",
  basicAuthController.basicAuth,
  productController.addProduct
);
router.get(
  "/delete/:id",
  basicAuthController.basicAuth,
  productController.deleteProduct
);
router.put(
  "/edit/:id",
  basicAuthController.basicAuth,
  productController.editProduct
);
router.get("/getproduct/:id", productController.getProduct);
router.get("/search", productController.searchProduct);
module.exports = router;
