const express = require('express');
const filesRouter = express.Router();
const { uploadFile, deleteFile, updateFile, deleteAllFiles, getFiles } = require('../controllers/filesController');

filesRouter.post('/upload', uploadFile);
filesRouter.put('/update/:id', updateFile);
filesRouter.delete('/delete/:id', deleteFile);
filesRouter.delete('/delete', deleteAllFiles);
filesRouter.get('/', getFiles);

module.exports = filesRouter;