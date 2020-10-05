exports.createPostValidator = (req, res, next) => {

    // title validation
    req.check('title', 'Post title is needed!').notEmpty();
    req.check('title', 'Post title length must be between 4 to 120 characters').isLength({
        min:4,
        max: 120
    });

    // body validation
    req.check('body', 'Post body is needed!').notEmpty();
    req.check('title', 'Post body length must be between 4 to 120 characters').isLength({
        min:4,
        max: 2500
    });

    // check for errors
    const errors = req.validationErrors();

    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }

    next();

};

exports.userSignupValidator = (req, res, next) => {

    req.check("name", "Name cannot be empty!").notEmpty();
    req.check("email", "Email must be between 3 to 32 characters!")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
        min:3,
        max: 32
    });

    req.check("password", "Password is required!").notEmpty();
    req.check("password")
    .isLength({
        min:6
    })
    .withMessage("Password must contain minimum 6 characters!")
    .matches(/\d/)
    .withMessage("Password must contain a number!");

    // check for errors
    const errors = req.validationErrors();

    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }

    next();
}