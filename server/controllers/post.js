const Post = require('../models/post')
const formidable = require('formidable');
const fs = require('fs')

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

