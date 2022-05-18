const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const colors = require('colors');

const prefix = '[route protection]'

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            // get user by id in payload
            req.user = await User.findById(decodedToken.id).select('-password');

            // run next middleware
            next();
        } catch (err) {
            console.log(`${prefix} ${err}`.red)

            res.status(401);
            throw new Error('not authorized');
        }
    }

    if(!token) {
        res.status(401);
        throw new Error('not authorized');
    }
});

module.exports = { protect }