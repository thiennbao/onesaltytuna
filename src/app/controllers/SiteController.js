const mongooseUtil = require('../../util/mongoose')
const Sushi = require('../models/Sushi')

class siteController {

    // GET homepage
    home(req, res, next) {
        Sushi.find({})
        .then(sushi => {
            sushi = mongooseUtil.getRandomSushi(sushi, 8)
            res.render('home', {
                home: true,
                sushi: sushi
            })
        })
        .catch(err => {
            res.status(500).send('ERROR !!!')
        })

    }

    // GET about
    about(req, res, next) {
        res.send('about')
    }

    // GET menu
    menu(req, res, next) {
        res.send('menu')
    }

    // GET contact
    contact(req, res, next) {
        res.send('contact')
    }

    
}

module.exports = new siteController