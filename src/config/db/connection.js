const mongoose = require('mongoose')


function connect(){
    mongoose.connect('mongodb+srv://thiennbao:thiennbao@onesaltytuna.n7fvaxk.mongodb.net/onesaltytuna?retryWrites=true&w=majority', () => {
        console.log('Connect to database successfully')
    })
}


module.exports = { connect }