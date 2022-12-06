const mongoose = require("mongoose");

const Schema = mongoose.Schema

const User = Schema({
    username: {type: String},
    password: {type: String},
    address: {type: String},
    phone: {type: Number},
    email: {type: String},
    role: {type: Number, default: 0}
})

module.exports = mongoose.model('User', User)