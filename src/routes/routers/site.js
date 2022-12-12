const express = require('express')
const router = express.Router()

const siteController = require('../../app/controllers/SiteController')

const siteMiddleware = require('../../app/middleware/SiteMiddleware')


// Site
router.get('/about', siteController.about)
router.get('/menu', siteController.menu)
router.get('/contact', siteController.contact)
router.post('/contact', siteController.contactForm)

// Order
router.post('/cart', siteController.cart)
router.get('/order', siteMiddleware.checkCard, siteController.order)
router.post('/submitOrder', siteController.submitOrder)

// Homepage
router.get('/', siteController.home)


module.exports = router