const user = require('../models/user');
const User = require('../models/user');

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json ({
                error: "User not found!"
            })
        }
        req.profile = user; // adds profile information in object in req with user info.
        next();
    })
}

exports.hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id === req.auth._id;
    if(!authorized) {
        res.status(403).json ({
            error: "User is not authorized to perform this task!"
        });
    }
}

exports.allUsers = (req, res) => {
    User.find((err, users) => {
        if (err) {
            res.status(400).json ({
                error: err
            });
        }
        res.json ({ users });
    }).select("name email updated created_on");
};