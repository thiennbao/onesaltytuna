const express = require('express')
const router = express.Router()

const authController = require('../../app/controllers/AuthController')

const authMiddleware = require('../../app/middleware/AuthMiddleware')


// Login
router.get('/login',authMiddleware.checkLoggedin, authController.login)
router.post('/login', authController.loginForm)

// Logout
router.post('/logout', authController.logout)

// Sign up
router.get('/signup',authMiddleware.checkLoggedin, authController.signup)
router.post('/signup', authController.signupForm)


module.exports = router