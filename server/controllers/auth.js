const User = require('../models/user')
const jwt = require('jsonwebtoken')
require("dotenv").config();
const User = require('../models/user')

exports.signup = async (req, res) => {

    const userExists = await User.findOne({ email: req.body.email });

    if(userExists) 
        return res.status(403).json({
            error: 'Email already exists!'
        });

    const user = await new User(req.body);
    
    await user.save();

    res.status(200).json({ message: "Signup Success! Please Login."});
}

exports.signin = (req, res) => {

    const {email, password} = req.body
    User.findOne({email}, (err, user) => {
            //if error or no user found
            if(err || !user) {
                return res.status(401).json({
                    error: "User not found! Please sign up."
                })
            }
            // making sure user email and password match
            // make authenticate method in user model and use it here
            if(!user.authenticate(password)) {
                return res.status(401).json({
                    error: "Email and Password doesn't match!"
                })  
            }
            // generate token with a user id and secret
            const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
            // persist the token as "t" in cookie with expiry date
            res.cookie("t", token, {expire: new Date() + 9999});
            // return response with user and token to the frontend client
            const {_id, name, email} = user
            return res.json({token, user: {_id, email, name}});
    })

}