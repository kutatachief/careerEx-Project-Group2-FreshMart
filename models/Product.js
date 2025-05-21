const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    stock: Number,
    category: {type: mongoose.Schema.Types.ObjectId, ref: "Category"}
});



module.exports = mongoose.model("Product", productSchema);