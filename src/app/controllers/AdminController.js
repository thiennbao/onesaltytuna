


class adminController {

    // GET admin
    admin(req, res) {
        res.render('body/admin/admin', {
            adminSite: true,
            admin: true,
            noHeader: true
        })
    }
}

module.exports = new adminController