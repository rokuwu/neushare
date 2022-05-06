const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const registerUser = (req, res) => {
    res.status(200).json({
        function: 'registerUser'
    });
}

const loginUser = (req, res) => {
    res.status(200).json({
        function: 'loginUser'
    });
}

const getMe = (req, res) => {
    res.status(200).json({
        function: 'getMe'
    });
}

module.exports = {
    registerUser, loginUser, getMe
}