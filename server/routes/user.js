const express = require('express')
const { userById, allUsers } = require('../controllers/user')

const router = express.Router()

router.get('/users', allUsers)

// any route with userId, our app first executes userById()
router.param("userId", userById)

module.exports = router;

