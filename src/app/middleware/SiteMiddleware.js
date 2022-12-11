const cookie = require('cookie')

class siteMiddleware {

    // Check cart
    checkCard(req, res, next) {
        var cookies = cookie.parse(req.headers.cookie || '')
        var cart = cookies.cart
        if (cart) {
            next()
        } else {
            res.redirect('/menu')
        }
    }
}

module.exports = new siteMiddleware
