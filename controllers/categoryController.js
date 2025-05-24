const category = require("../models/category");





//create category with validations
exports.createCategory = async (req, res) => {

    try {
        const {name} = req.body;


        //check if name is provided
        if (!name || name.trim() === "") {
            return res.status(400).json({message: "Category name is required"});
        }

        //check if category already exists
        const existingCategory = await category.findOne({name});
        if (existingCategory){
            return res.status(409).json({message: "Catgory already exists"});
        }
        
        //create the category
        const newCategory = new category({name});
        await newCategory.save();


        res.status(201).json({message: "Category created successfully", newCategory });


    }catch (error){
        res.status(500).json({message: "Error creating category", error: err.message})
    }
};



