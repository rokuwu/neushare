const Invite = require('../models/inviteModel');
const asyncHandler = require('express-async-handler');
const crypto = require('crypto');

const createInvite = asyncHandler(async (req, res) => {
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
    const invites = await Invite.find();
    
    res.status(200).json({
        function: 'getInvites',
        invites
    });
});

// gen invite
const genInvite = async () => {
    const randomBytes = crypto.randomBytes(16);
    const buffer = Buffer.from(randomBytes);
    const invite = buffer.toString('base64');
    
    return invite;
}

module.exports = {
    createInvite, getInvites
}