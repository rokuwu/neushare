const express = require('express');
const usersRouter = express.Router();
const { registerUser, loginUser, getUserInfo, updateEmail, updatePassword } = require('../controllers/usersController');
const { protect } = require('../middleware/protectRoutes');

usersRouter.post('/register', registerUser);
usersRouter.post('/login', loginUser);
usersRouter.get('/profile/:username', protect, getUserInfo);
usersRouter.put('/profile/:username/password', protect, updatePassword);
usersRouter.put('/profile/:username/email', protect, updateEmail);

module.exports = usersRouter;