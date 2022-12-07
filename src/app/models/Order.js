const mongoose = require("mongoose");

const Schema = mongoose.Schema

const Order = Schema({
    username: {type: String},
    name: {type: String},
    phone: {type: Number},
    address: {type: String},
    message: {type: String},
    content: {type: String}
})

module.exports = mongoose.model('Order', Order)