// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const { createProduct } = require("../controllers/productController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

// Route: POST /admin/products
router.post("/products", authMiddleware, isAdmin, createProduct);

module.exports = router;
