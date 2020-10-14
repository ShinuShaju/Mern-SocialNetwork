const express = require('express');
const { getPosts, createPost, postsByUser, postById, deletePost, updatePost, isPoster } = require('../controllers/post');
const { requireSignin } = require('../controllers/auth');
const { userById } = require('../controllers/user')
const { createPostValidator } = require('../validators');

const router = express.Router()

router.get('/posts',getPosts)
router.post('/post/new/:userId', requireSignin, createPost, createPostValidator);
router.get('/posts/by/:userId',requireSignin, postsByUser);
router.put('/post/:postId', requireSignin, isPoster, updatePost);
router.delete('/post/:postId', requireSignin, isPoster, deletePost);

// any route with userId, our app first executes userById()
router.param("userId", userById);
// any route with postId, our app first executes postById()
router.param("postId", postById);

module.exports = router;

