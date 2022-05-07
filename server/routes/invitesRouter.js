const express = require('express');
const invitesRouter = express.Router();
const { createInvite, getInvites, deleteInvite, genInvite } = require('../controllers/invitesController');

invitesRouter.get('/', getInvites);
invitesRouter.get('/create', createInvite);
invitesRouter.delete('/delete/:id', deleteInvite);

module.exports = invitesRouter;