const express = require('express')
const router = express.Router()

const siteController = require('../app/controllers/SiteController')


// Site
router.get('/about', siteController.about)
router.get('/menu', siteController.menu)
router.get('/contact', siteController.contact)
// Homepage
router.get('/', siteController.home)


module.exports = router