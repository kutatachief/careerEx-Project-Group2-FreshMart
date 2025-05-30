const Order = require("../models/order");
const Product = require("../models/product");




//place a new order
exports.placeOrder = async (req, res) => {
    try {
        const {items} = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({message: "No items in order"});
        }

        //calculate total amount
        //loop through the items and calculate total
        let total = 0;
        for (let item of items) {
            const product = await Product.findById(item.product);
            
            if (!product) return res.status(404).json({message: `Product not found: ${item.product}`});

            if (product.stock < item.quantity) {
                return res.status(400).json({message: `Not enough stock for ${product.name}`});
            }

            //Deduct stock
            product.stock -= item.quantity;
            
            await product.save();

            total += product.price * item.quantity;
        };

        
        //create order
        const order = new Order({
            user: req.user.id,
            items,
            total: total,
            status: "Processing"
        });

        await order.save();

        res.status(201).json({message: "Order placed successfully", order})
    
    
    }catch(error){
        res.status(500).json({message: "Order failed", error});
    }
};






//Get orders for a user
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Orders.find({user: req.user.id}).populate("items.product", "name price");
        
        res.status(200).json({message: "Here are your orders:", orders});

    }catch(error){
        res.status(500).json({message: "Failed to fetch orders", error});
    }
};
