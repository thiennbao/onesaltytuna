const handlerbarsUtil = require('../../util/handlerbars')

class userController {
    
    // GET /:username
    user(req, res) {
        res.render('user', {
            user: true,
            isLoggedin: handlerbarsUtil.isLoggedin(req),
            username: handlerbarsUtil.getUsername(req),
        })
    }

}

module.exports = new userController