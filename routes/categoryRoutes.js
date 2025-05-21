// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const { createCategory } = require("../controllers/categoryController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

// Route: POST /admin/products
router.post("/categories", authMiddleware, isAdmin, createCategory);


module.exports = router;
