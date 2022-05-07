const express = require('express');
const invitesRouter = express.Router();
const { createInvite, getInvites, deleteInvite } = require('../controllers/invitesController');

invitesRouter.post('/create', createInvite);
invitesRouter.post('/delete/:id', deleteInvite);
invitesRouter.get('/', getInvites);

module.exports = invitesRouter;