const express = require('express');
const filesRouter = express.Router();
const { uploadFile, deleteFile, updateFile, deleteAllFiles, getFiles, upload } = require('../controllers/filesController');
const { protect } = require('../middleware/protectRoutes');

filesRouter.post('/upload', protect, upload.single('file'), uploadFile);
filesRouter.put('/update/:id', protect, updateFile);
filesRouter.delete('/delete/:id', protect, deleteFile);
filesRouter.delete('/delete', protect, deleteAllFiles);
filesRouter.get('/', protect, getFiles);

module.exports = filesRouter;