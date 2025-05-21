const product = require("../models/product");

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
        const newProduct = new product({name, price, stock, category});
        await newProduct.save();

        res.status(201).json({message: "Product created successfully", newProduct});

    }catch(error){
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};


