const Invite = require('../models/inviteModel');
const asyncHandler = require('express-async-handler');
const crypto = require('crypto');
const { isAdmin } = require('./usersController');

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

module.exports = {
    createInvite, getInvites
}