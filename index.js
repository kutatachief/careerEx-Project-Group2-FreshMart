const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
dotenv.config()

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

const app = express()
app.use(express.json())

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 8000

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("Mongodb connected...")

    app.listen(PORT, ()=>{
        console.log(`Server started running on Port ${PORT}`)
    }) 
})

