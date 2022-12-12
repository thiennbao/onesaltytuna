const express = require('express')
const router = express.Router()

const superController = require('../../app/controllers/SuperController')

// Super
router.get('/', superController.super)


module.exports = router