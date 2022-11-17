const express = require('express')
const userControllers = require('../controllers/controllers')
const router = express.Router()

router.get("/", userControllers.getUsername)

module.exports = router