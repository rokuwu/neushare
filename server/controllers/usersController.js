const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    
    // check for missing information
    if(!username || !email || !password) {
        res.status(400)

        throw new Error('missing information');
    }

    // check if user already exists
    const emailExists = await User.findOne({ email });
    if(emailExists) {
        res.status(400);

        throw new Error('user already exists');
    }

    const usernameExists = await User.findOne({ username });
    if(usernameExists) {
        res.status(400);

        throw new Error('user already exists');
    }

    // to do: check for valid email

    // hash password
    const salt = await bcrypt.genSalt(13);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        admin: false
    });
    
    // check if operatin was successful
    if(user) {
        res.status(200).json({
            function: 'registerUser',
            user
        });
    } else {
        res.status(400);
        throw new Error('invalid user data');
    }    
});

const loginUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        function: 'loginUser'
    });
});

const getMe = asyncHandler(async (req, res) => {
    res.status(200).json({
        function: 'getMe'
    });
});

module.exports = {
    registerUser, loginUser, getMe
}