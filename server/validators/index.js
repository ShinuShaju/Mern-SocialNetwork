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
};
