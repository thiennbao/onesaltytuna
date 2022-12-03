const mongoose = require("mongoose");

const Schema = mongoose.Schema

const User = Schema({
    username: {type: String},
    password: {type: String},
    phone: {type: Number},
    email: {type: String}
})

module.exports = mongoose.model('User', User)