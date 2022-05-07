const Invite = require('../models/inviteModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const crypto = require('crypto');

const createInvite = asyncHandler(async (req, res) => {
    if(isAdmin(req.user) == false) {
        res.status(401);
        throw new Error('not authorized');
    }
    
    const invite = await genInvite(); 
    
    Invite.create({
        invite
    });

    res.status(200).json({
        function: 'createInvite',
        invite
    });
});

const getInvites = asyncHandler(async (req, res) => {
    if(isAdmin(req.user) == false) {
        res.status(401);
        throw new Error('not authorized');
    }    
    
    const invites = await Invite.find();

    res.status(200).json({
        function: 'getInvites',
        invites
    });
});

// gen invite
const genInvite = asyncHandler(async () => {
    const randomBytes = crypto.randomBytes(16);
    const buffer = Buffer.from(randomBytes);
    const invite = buffer.toString('base64');
    
    return invite;
});

// check if user is admin
const isAdmin = (user) => {
    if(user.admin === true) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    createInvite, getInvites
}