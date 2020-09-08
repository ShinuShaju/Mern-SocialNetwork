const Post = require('../models/post')

exports.getPosts = (req, res) => {
    res.json({
        post: [
            {title: "First Post" },
            {title: "Second Post" }
        ]
    });
};

exports.createPost = (req, res) => {
    const post = new Post(req.body);
    console.log('Creating post...', post);
};