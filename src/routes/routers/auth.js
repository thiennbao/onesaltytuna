const express = require('express')
const router = express.Router()

const authController = require('../../app/controllers/AuthController')
const AuthMiddleware = require('../../app/middleware/AuthMiddleware')


// Login
router.get('/login', authController.login)
router.post('/login', authController.loginForm)

// Sign up
router.get('/signup', authController.signup)
router.post('/signup', AuthMiddleware.checkAvailable, authController.signupForm)


module.exports = router