const express = require('express');
const { getPosts, createPost } = require('../controllers/post');
const { requireSignin } = require('../controllers/auth');
const { userById } = require('../controllers/user')
const { createPostValidator } = require('../validators');

const router = express.Router()

router.get('/', getPosts)
router.post('/post', requireSignin, createPostValidator, createPost)

// any route with userId, our app first executes userById()
router.param("userId", userById)

module.exports = router;

