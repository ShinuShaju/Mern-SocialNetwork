const express = require('express')
const { userById, allUsers, getUser, updateUser } = require('../controllers/user')
const { requireSignin } = require('../controllers/auth');

const router = express.Router()

router.get('/users', allUsers);
router.get('/user/:userId', requireSignin, getUser);
router.put('/user/:userId', requireSignin, updateUser);

// any route with userId, our app first executes userById()
router.param("userId", userById)

module.exports = router;

