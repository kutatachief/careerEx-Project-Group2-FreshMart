const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    email: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    role: {type: String, enum: ["user", "admin"], default: "user"},
    isActive: {type: Boolean, default: true}

}, {timestamps: true});


const User = mongoose.model("User", userSchema)

module.exports = User

