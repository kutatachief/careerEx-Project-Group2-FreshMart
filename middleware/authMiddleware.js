const jwt = require("jsonwebtoken");



//Checks for valid token
exports.authMiddleware = (req, res, next) => {
    
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({message: "Token missing"})
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);   //decode the token
        
        req.user = decoded; //save user info for next use
        
        next();   //allow access to the next step


    }catch (error) {
        res.status(401).json({message: "Invalid token"});
    }
};



//Check if user role is Admin
exports.isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({message: "Access denied: Admins only"});
    }
    next();
};





//If both pass, createProduct runs
