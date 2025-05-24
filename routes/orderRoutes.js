

const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const {authMiddleware} = require("../middleware/authMiddleware");


router.post("/orders", authMiddleware, orderController.placeOrder);
router.post("/orders", authMiddleware, orderController.getUserOrders);


module.exports = router;
