const User = require('../models/User')

class authMiddleware {

    // Sign up check available
    checkAvailable(req, res, next) {
        User.findOne({
            username: req.body.username
        })
        .then(data => {
            if (data) {
                res.render('signup', {
                    signup: true,
                    notAvailable: true,
                    user: {
                        username: req.body.username,
                        phone: req.body.phone,
                        email: req.body.email
                    }
                })
            } else {
                User.create({
                    username: req.body.username,
                    password: req.body.password,
                    phone: req.body.phone,
                    email: req.body.email
                })
                .then(data => {
                    next()
                })
            }
        })
        .catch(err => {
            res.send('ERROR')
        })
    }
}

module.exports = new authMiddleware