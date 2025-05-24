const Product = require("../models/product");




exports.createProduct = async (req, res) => {

    try {
        const {name, price, stock, category} = req.body;

        //validations
        if (!name || name.trim() === "") {
            return res.status(400).json({message: "Product name is required"});
        }

        if (price == null || price < 0) {
            return res.status(400).json({message: "Valid price is required"});
        }

        if (stock == null || stock < 0) {
            return res.status(400).json({message: "Valid stock quantity is required"});
        }

        if (!category) {
            return res.status(400).json({message: "Category not found"});
        }

        //create the new product and save
        const newProduct = new Product({name, price, stock, category});
        await newProduct.save();


        res.status(201).json({message: "Product created successfully", newProduct});


    }catch(error){
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};




//Get all products

exports.getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find().populate("category", "name");
        
        res.status(200).json(allProducts);

    }catch(error) {
        res.status(500).json({message: "Server error"});
    }
};




//Get single product by ID

exports.getProductById = async (req, res) => {
    try {
        const oneProduct = await Product.findById(req.params.id).populate("category", "name");

        if (!oneProduct){
            return res.status(404).json({message: "Product not found"})
        }

        res.status(200).json(oneProduct);

    }catch(error){
        res.status(500).json({message: "Server error"});
    }
};



