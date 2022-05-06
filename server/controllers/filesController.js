const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const File = require('../models/fileModel');

const uploadFile = (req, res) => {
    res.status(200).json({
        function: 'uploadFile'
    });
}

const deleteFile = (req, res) => {
    res.status(200).json({
        function: 'deleteFile'
    });
}

const updateFile = (req, res) => {
    res.status(200).json({
        function: 'updateFile'
    });
}

const deleteAllFiles = (req, res) => {
    res.status(200).json({
        function: 'deleteAllFiles'
    });
}

const getFiles = (req, res) => {
    res.status(200).json({
        function: 'getFiles'
    });
}

module.exports = {
    uploadFile, deleteFile, updateFile, deleteAllFiles, getFiles
}