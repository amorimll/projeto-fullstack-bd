const express = require('express')
const userControllers = require('../controllers/userControllers')
const router = express.Router()

router.get("/", userControllers.getAllPosts)
router.post("/", userControllers.createNewPost)
router.delete("/", userControllers.deletePost)
router.patch("/", userControllers.updatePost)

module.exports = router