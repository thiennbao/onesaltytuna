const express = require('express')
const path = require('path')


const app = express()
const port = 3000


// Static files
app.use(express.static(path.join(__dirname, 'public')))


// Route init
const route = require('./routes/route')
route(app)

// Sever
app.listen(port, function() {
    console.log('Connect successfully, some bullshit happens at http://localhost:3000')
})