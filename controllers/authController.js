
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { sendForgotPasswordEmail } = require("../utils/sendForgotPass");






exports.register = async (req, res) => {

    try {
        
        const {firstName, lastName, email, password, role} = req.body;

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

        //create a new user and save
        const newUser = new User({
            firstName, 
            lastName, 
            email, 
            password: hashedPassword,
            role
        })

        await newUser.save();

 


        res.status(201).json({
            message: "User registered sucessfully",
            newUser: {firstName, lastName, email, role}
        })
        
    }catch (error) {
        res.status(500).json({ message: "Registration failed", error: error.message });
    }

  };




  
exports.login = async (req, res) => {
    
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(!user){
        return res.status(404).json({message: "User account does not exist"})
    }

    // if (!user.isVerified) {
    //     return res.status(401).json({message: "Email not verified"})
    // }

    const isMatch = await bcrypt.compare(password, user?.password)

    if(!isMatch){
        return res.status(400).json({message: "Incorrect email or password."})
    }



    //Generate a token
    const accessToken = jwt.sign(
        {id: user?._id, role: user?.role },
        process.env.ACCESS_TOKEN,
        {expiresIn: "60m"}
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






  //forget password (send reset email)
exports.forgotPassword = async (req, res) => {
  try {
    const {email, userName} = req.body;

    const user = await Auth.findOne({email});

    if (!user) {
        return res.status(404).json({meassage: "User not found."});
    }

    //send the user an email with their token
    const accessToken = await jwt.sign(
        {user},
        `${process.env.ACCESS_TOKEN}`,
        { expiresIn: "5m"}

    )

    await sendForgotPasswordEmail(email, accessToken)


    //send OTP

    res.status(201).json({message: "Please check your email"});

 } catch (error) {
    res.status(500).json({ message: "Failed to send reset email", error });
  }
};



// Reset password using token
exports.resetPassword = async (req, res) => {
    try{

        const {email, password} = req.body;

        const user = await Auth.findOne({email})

        if(user){
            return res.status(404).json({message: "User account not found"})
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        user.password = hashedPassword

        await user.save()

        res.status(200).json({message: "Password reset successful."})

    }catch(error){
        res.status(500).json({ message: "Failed to send reset password", error });
    }
};