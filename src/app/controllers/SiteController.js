class siteController {

    // GET homepage
    home(req, res, next) {
        res.render('home', {
            home: true,
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