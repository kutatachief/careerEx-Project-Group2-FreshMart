const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
dotenv.config()


const app = express()

app.use(express.json())

const PORT = process.env.PORT || 8000

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("Mongodb connected...")

    app.listen(PORT, ()=>{
        console.log(`Server started running on Port ${PORT}`)
    }) 
})

