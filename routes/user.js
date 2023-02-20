const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

router.get("/cart/:id", userController.getCart);
router.post("/cart/postcart/:id", userController.postCart);
router.put("/cart/updatedcart/:id", userController.updateCart);
router.post("/cart/deletecart/:id", userController.deleteCart);
router.post("/order/post", userController.postOrder);
router.get("/orders", userController.getOrders);
router.get("/order/user/:id", userController.getOrder);
router.get("/order/user/find/:userid/:detailid", userController.getOrderDetail);
module.exports = router;
