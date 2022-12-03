
class authController {
    
    // GET Login
    login(req, res) {
        res.render('login', {
            login: true,
        })
    }

    // POST Login
    loginForm(req, res) {
        res.render('login', {
            login: true
        })
    }

    // GET Signup
    signup(req, res) {
        res.render('signup', {
            signup: true,
        })
    }

    // POST Signup
    signupForm(req, res) {
        res.render('signup', {
            signup: true,
            success: true
        })
    }
}

module.exports = new authController