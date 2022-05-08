const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const File = require('../models/fileModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { isAdmin } = require('./usersController');

// to do: file type filter, file size limits
const uploadFile = asyncHandler(async (req, res) => {
    const user = req.user;
    const path = `uploads/${req.file.filename}`;
    const fullPath = req.file.path;
    const type = req.file.mimetype;

    const file = await File.create({
        user: user.id,
        type,
        path,
        fullPath
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
    const fileId = req.params.id;
    const user = req.user;

    // checking credentials
    if(!fileId) {
        res.status(400);
        throw new Error('missing information');
    }

    const file = await File.findById(fileId);

    if(!file) {
        res.status(400);
        throw new Error('file does not exist');
    }

    if(user.id !== file.user) {
        res.status(401);
        throw new Error('not authorized');
    }

    // delete file and remove document from db
    await fs.unlink(file.fullPath, () => {});
    await File.deleteOne({ id: fileId });
    
    res.status(200).json({
        function: 'deleteFile',
        deletedFile: file
    });
});

const updateFile = asyncHandler(async (req, res) => {
    // to do

    res.status(200).json({
        function: 'updateFile'
    });
});

const deleteAllFiles = asyncHandler(async (req, res) => {
    const user = req.user;
    const files = await File.find({ user: user.id });

    if(!files || files.length === 0) {
        res.status(400);
        throw new Error('files do not exist');
    }
    
    // delete files and remove documents from db
    files.forEach((f) => {
        fs.unlink(f.fullPath, () => {});
    });
    await File.deleteMany({ user: user.id });
    
    res.status(200).json({
        function: 'deleteAllFiles'
    });
});

const getFiles = asyncHandler(async (req, res) => {
    const user = req.user;
    const files = await File.find({ user: user.id });

    if(!files || files.length === 0) {
        res.status(400);
        throw new Error('files do not exist');
    }
    
    res.status(200).json({
        function: 'getFiles',
        files
    });
});

const getAllFiles = asyncHandler(async (req, res) => {
    const user = req.user;

    if(!isAdmin(user)){
        res.status(401);
        throw new Error('not authorized');
    }

    const files = await File.find();

    if(!files || files.length === 0) {
        res.status(400);
        throw new Error('files do not exist');
    }
    
    res.status(200).json({
        function: 'getFiles',
        files
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
    uploadFile, deleteFile, updateFile, deleteAllFiles, getFiles, getAllFiles, upload
}