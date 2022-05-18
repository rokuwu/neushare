const express = require('express');
const invitesRouter = express.Router();
const { createInvite, getInvites } = require('../controllers/invitesController');
const { protect } = require('../middleware/protectRoutes');

invitesRouter.get('/get', protect, getInvites);
invitesRouter.post('/create', protect, createInvite);

module.exports = invitesRouter;