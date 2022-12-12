const express = require('express')
const router = express.Router()

const siteController = require('../../app/controllers/SiteController')

const siteMiddleware = require('../../app/middleware/SiteMiddleware')
const authMiddleware = require('../../app/middleware/AuthMiddleware')


// Site
router.get('/about', authMiddleware.checkIsUser, siteController.about)
router.get('/menu', authMiddleware.checkIsUser, siteController.menu)
router.get('/contact', authMiddleware.checkIsUser, siteController.contact)
router.post('/contact', siteController.contactForm)

// Order
router.post('/cart', siteController.cart)
router.get('/order', siteMiddleware.checkLoggedin, siteMiddleware.checkCard, siteController.order)
router.post('/submitOrder', siteController.submitOrder)

// Homepage
router.get('/', authMiddleware.checkIsUser, siteController.home)


module.exports = router