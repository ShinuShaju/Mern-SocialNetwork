const Post = require('../models/post')

// get posts from DB
exports.getPosts = (req, res) => {

    const posts = Post.find()
        .then((posts) => {
                res.json({posts:posts});
        })
        .catch(err => console.log(err));
};

// save posts into DB
exports.createPost = (req, res) => {
   
    const post = new Post(req.body);

    post.save().then (result => {
        res.status(200).json ({
            post:result
        })

    })
};

