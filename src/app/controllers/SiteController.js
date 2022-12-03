const mongooseUtil = require('../../util/mongoose')
const Sushi = require('../models/Sushi')
const News = require('../models/News')

class siteController {

    // GET homepage
    home(req, res, next) {
        Sushi.find({})
        .then(sushi => {

            News.find({})
            .then( news => {
                sushi = mongooseUtil.getRandomSushi(sushi, 8)
                news = mongooseUtil.getNewestNews(news, 3)
                res.render('home', {
                    home: true,
                    sushi: sushi,
                    news: news
                })
            })
            .catch( err => {
                console.log(err)
                res.status(500).send('ERROR !!!')
            })

        })
        .catch(err => {
            console.log(err)
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