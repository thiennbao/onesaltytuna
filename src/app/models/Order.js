const mongoose = require("mongoose");

const Schema = mongoose.Schema

const Order = Schema({
    username: {type: String},
    name: {type: String},
    phone: {type: Number},
    address: {type: String},
    method: {type: String},
    cardnumber: {type: String},
    expiration: {type: String},
    ccv: {type: String},
    cardname: {type: String},
    billingaddr: {type: String},
    postalcode: {type: String},
    message: {type: String},
    content: {type: String},
    supername: {type: String, default: 0}
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = mongoose.model('Order', Order)