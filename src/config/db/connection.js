const mongoose = require('mongoose')


function connect(){
    mongoose.set('strictQuery', true);
    mongoose.connect('mongodb+srv://thiennbao:thiennbao@onesaltytuna.n7fvaxk.mongodb.net/onesaltytuna?retryWrites=true&w=majority', () => {
        console.log('Connect to database successfully')
    })

    // mongoose.connect('mongodb://127.0.0.1:27017/onesaltytuna', () => {
    //     console.log('Connect to database successfully')
    // })
}


module.exports = { connect }