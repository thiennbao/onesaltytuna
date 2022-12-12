const express = require('express')
const router = express.Router()

const adminController = require('../../app/controllers/AdminController')

// Super
router.get('/', adminController.admin)


module.exports = router