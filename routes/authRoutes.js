const express = require("express");
const router = express.Router();
const {register, login} = require("../controllers/authcontroller");
const { sendForgotPasswordEmail, validEmail } = require("../utils/sendForgotPass");


router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", sendForgotPasswordEmail);
router.post("/reset-password/:token", validEmail);

module.exports = router;