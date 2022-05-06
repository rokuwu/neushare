const express = require('express');
const usersRouter = express.Router();
const asyncHandler = require('express-async-handler');
const { registerUser, loginUser, getMe } = require('../controllers/usersController');

usersRouter.post('/register', registerUser);
usersRouter.post('/login', loginUser);
usersRouter.get('/me', getMe);

module.exports = usersRouter;