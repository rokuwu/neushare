const express = require('express');
const invitesRouter = express.Router();
const { createInvite, getInvites } = require('../controllers/invitesController');

invitesRouter.get('/', getInvites);
invitesRouter.post('/create', createInvite);

module.exports = invitesRouter;