const express = require('express')
const router = express.Router()

const adminController = require('../../app/controllers/AdminController')

const authMiddleware = require('../../app/middleware/AuthMiddleware')

// Admin
router.get('/', authMiddleware.checkIsAdmin, adminController.clerk)
router.post('/addClerk', adminController.addClerk)

// Menu manage
router.get('/menu', authMiddleware.checkIsAdmin, adminController.menu)
router.post('/addDish', adminController.addDish)

// News manage
router.get('/news', authMiddleware.checkIsAdmin, adminController.news)
router.post('/addNews', adminController.addNews)

// Contact manage
router.get('/contact', authMiddleware.checkIsAdmin, adminController.contact)


module.exports = router