// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const { createProduct, getAllProducts, getProductById } = require("../controllers/productController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
// const productController = require("../controllers/productController");
  


// Route: POST /admin/products
router.post("/products", authMiddleware, isAdmin, createProduct);

router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);


module.exports = router;
