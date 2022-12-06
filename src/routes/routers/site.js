const express = require('express')
const router = express.Router()

const siteController = require('../../app/controllers/SiteController')

const authMiddleware = require('../../app/middleware/AuthMiddleware')


// Site
router.get('/about', siteController.about)
router.get('/menu', siteController.menu)
router.get('/contact', siteController.contact)

// Order
router.post('/cart', siteController.cart)
router.get('/order', siteController.order)
router.post('/submitOrder', siteController.submitOrder)

// Homepage
router.get('/', siteController.home)


module.exports = router