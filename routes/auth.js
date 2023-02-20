const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();

router.post("/singup", authController.register);

router.post("/singing", authController.singIn);

module.exports = router;

module.exports = router;
