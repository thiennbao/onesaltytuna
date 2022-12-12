const mongoose = require("mongoose");

const Schema = mongoose.Schema

const User = Schema({
    username: {type: String},
    password: {type: String},
    name: {type: String},
    address: {type: Object},
    phone: {type: String},
    email: {type: String},
    card: {type: Object},
    role: {type: String, default: "user"}
})

module.exports = mongoose.model('User', User)