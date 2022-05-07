const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Invite = require('../models/inviteModel');

const createInvite = (req, res) => {
    res.status(200).json({
        function: 'createInvite'
    });
}

const getInvites = (req, res) => {
    res.status(200).json({
        function: 'getInvites'
    });
}

const deleteInvite = (req, res) => {
    res.status(200).json({
        function: 'deleteInvite'
    });
}

// gen invite
const genInvite = () => {
     
}

module.exports = {
    createInvite, getInvites, deleteInvite
}