const Post = require('../models/post')
const formidable = require('formidable');
const fs = require('fs');
const { sortBy } = require('lodash');


exports.postById = (req, res, next, id) => {
    Post.findById(id)
    .populate("postedBy", "_id name")
    .exec((err, post) => {
        if(err || !post) {
            return res.status(400).json ({
                error: "Post not found!"
            })
        }
        req.post = post; // adds profile information in object in req with user info.
        next();
    })
}

// get posts from DB
exports.getPosts = (req, res) => {

    const posts = Post.find()
    .populate("postedBy", "_id name")
    .select("_id title body")
            .then((posts) => {
                    res.json({ posts });
            })
            .catch(err => console.log(err));
};

// save posts into DB
exports.createPost = (req, res) => {
   
    let form = new formidable.IncomingForm()
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded!"
            })
          return;
        }

        let post = new Post(fields);

        req.profile.hashed_password = undefined;
        req.profile.salt = undefined; 
        post.postedBy = req.profile;

        if(files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = fs.photo.type;
        }

        post.save((err, result) => {
            if(err) {
                res.status(400).json({
                    error: err
                })
            }
            res.json(result)
        })

      });
      
};


exports.postsByUser = (req, res) => {
    Post.find({ postedBy: req.profile._id})
    .populate("postedBy", "_id name")
    .sort("_created")
    .exec((err, posts) => {
        if(err) {
            res.status(400).json ({
                error: err
            })
        }
        res.json(posts);
    })
}

exports.isPoster = (req, res, next) => {
    const isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id;
    if(!isPoster) {
        res.status(403).json ({
            error: "User is not authorized to perform this task!"
        });
    }
    next();
}

exports.deletePost = (req, res) => {
    let post = req.post;
    post.remove((err, post) => {
        if(err) {
            return res.status(400).json({
                error: err
            })
        }
        res.status(200).json({ message: "Post deleted!"});
    })
}