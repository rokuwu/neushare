const express = require('express');
const usersRouter = express.Router();
const { registerUser, loginUser, getUserInfo, updateEmail, updatePassword } = require('../controllers/usersController');
const { protect } = require('../middleware/protectRoutes');

usersRouter.post('/register', registerUser);
usersRouter.post('/login', loginUser);
usersRouter.get('/get', protect, getUserInfo);
//usersRouter.get('/get/:id', protect, getUserInfo);
usersRouter.put('/updatePassword', protect, updatePassword);
usersRouter.put('/updateEmail', protect, updateEmail);

module.exports = usersRouter;