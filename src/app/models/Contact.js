const mongoose = require("mongoose");

const Schema = mongoose.Schema

const Contact = Schema({
    name: {type: String},
    email: {type: String},
    phone: {type: String},
    address: {type: String},
    message: {type: String},
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = mongoose.model('Contact', Contact)