// models/Product.js
const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});
module.exports = mongoose.model('Product', ProductSchema);
