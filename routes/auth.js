const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();

router.post("/singup", authController.register);

router.post("/signin", authController.singIn);
router.post("/logout", authController.postLogout);
router.post("/logingadmin", authController.singInAdmin);
module.exports = router;
