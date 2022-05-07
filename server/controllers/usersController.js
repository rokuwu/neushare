const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Invite = require('../models/inviteModel');
const asyncHandler = require('express-async-handler');

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, invite } = req.body;
    
    // check for missing information
    if(!username || !email || !password || !invite) {
        res.status(400);
        
        throw new Error('missing information');
    }

    // check for valid invite
    const inviteCheck = await Invite.findOne({ invite });

    if(inviteCheck.used === true){
        res.status(400);
    
        throw new Error('already used invite');
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
    
    // mark invite as used
    const updatedInvite = await Invite.findOneAndUpdate(
        { invite },
        {
            used: true,
            user: user._id
        },
        { new: true }
    );

    const token = await genToken(user._id);
    //console.log(token);

    // add token to user
    const updatedUser = await User.findByIdAndUpdate(user._id, { token }, {
        new: true
    });
    
    // check if operation was successful
    if(updatedUser) {
        res.status(200).json({
            function: 'registerUser',
            user: updatedUser,
            invite: updatedInvite
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

const getUserInfo = asyncHandler(async (req, res) => {
    res.status(200).json({
        function: 'getMe'
    });
});

const updateEmail = asyncHandler(async (req, res) => {
    res.status(200).json({
        function: 'updateEmail'
    });
});

const updatePassword = asyncHandler(async (req, res) => {
    res.status(200).json({
        function: 'updatePassword'
    });
});

// generate jwt
const genToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '31d' });
}

module.exports = {
    registerUser, loginUser, getUserInfo, updateEmail, updatePassword
}