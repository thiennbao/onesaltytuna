const cookie = require('cookie')
const jwt = require('jsonwebtoken')

class siteMiddleware {

    // Check is logged in
    checkLoggedin(req, res, next) {
        try {
            var cookies = cookie.parse(req.headers.cookie || '')
            var token = cookies.token
            var data = jwt.verify(token, 'お前はもう死んでいる')
            if (data) {
                next()
            }
        } catch (err) {
            // res.redirect('/auth/login')
            res.json('err')
        }
    }

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
