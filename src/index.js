const express = require('express')


const app = express()
const port = 3000


// Sever
app.listen(port, function() {
    console.log('Connect successfully, some bullshit happens at http://localhost:3000')
})