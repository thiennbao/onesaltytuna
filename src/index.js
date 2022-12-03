const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const db = require('./config/db/connection')

const app = express()
const port = 3000


// Connect to DB
db.connect()

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// Template engine
app.engine('hbs', exphbs.engine({extname: 'hbs'}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

// Data
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Route init
const route = require('./routes/route')
route(app)

// Sever
app.listen(port, function() {
    console.log('Connect successfully, some bullshit happens at http://localhost:3000')
})