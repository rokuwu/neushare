const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const File = require('../models/fileModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const multer = require('multer');
const path = require('path');

const uploadFile = asyncHandler(async (req, res) => {
    const user = req.user;
    const path = `uploads/${req.file.filename}`;
    const type = req.file.mimetype;

    const file = await File.create({
        user: user.id,
        type,
        path
    });

    if(!file){
        res.status(400);
        throw new Error('invalid file data');
    }

    res.status(200).json({
        function: 'uploadFile',
        file
    });
});

const deleteFile = asyncHandler(async (req, res) => {
    res.status(200).json({
        function: 'deleteFile'
    });
});

const updateFile = asyncHandler(async (req, res) => {
    res.status(200).json({
        function: 'updateFile'
    });
});

const deleteAllFiles = asyncHandler(async (req, res) => {
    res.status(200).json({
        function: 'deleteAllFiles'
    });
});

const getFiles = asyncHandler(async (req, res) => {
    res.status(200).json({
        function: 'getFiles'
    });
});

// multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = '/../uploads';
        const uploadPath = path.join(__dirname, dir);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

module.exports = {
    uploadFile, deleteFile, updateFile, deleteAllFiles, getFiles, upload
}