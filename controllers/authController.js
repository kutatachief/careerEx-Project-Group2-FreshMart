
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");




exports.register = async (req, res) => {

    try {
        
        const {firstName, lastName, email, password, role, isActive} = req.body;

        if(!email) {
            return res.status(400).json({message: "Please add your email"})
        }
        
        if(!password) {
            return res.status(400).json({message: "Please enter password"})
        }

        const existingUser = await User.findOne({email})

        if(existingUser) {
            return res.status(400).json({message: "User account already exist"})
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = new User({
            firstName, 
            lastName, 
            email, 
            password: hashedPassword,
            role, 
            isActive
        })

        await newUser.save()

        res.status(201).json({
            message: "User account created successfully",
            newUser: {firstName, lastName, email, role, isActive}
        })
        
    }catch (error) {

    }

  };
  
exports.login = async (req, res) => {
    
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(!user){
        return res.status(404).json({message: "User account does not exist"})
    }

    const isMatch = await bcrypt.compare(password, user?.password)

    if(!isMatch){
        return res.status(400).json({message: "Incorrect email or password."})
    }



    //Generate a token
    const accessToken = jwt.sign(
        {id: user?._id, role: user?.role },
        process.env.ACCESS_TOKEN,
        {expiresIn: "5m"}
    )

    const refreshToken = jwt.sign(
        {id: user?._id, role: user?.role},
        process.env.REFRESH_TOKEN,
        {expiresIn: "30d"}
    )
    
    
    res.status(200).json({
        message: "Login successfully",
        accessToken,
        user: {
            email: user?.email,
            firstName: user?.firstName,
            lastName: user?.lastName,
            // role: user?.role,
            // isActive: user?.role

        },
        refreshToken
        
    })

  };

