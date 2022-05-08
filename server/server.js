const express = require('express');
const colors = require('colors');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./database/connect');
const dotenv = require('dotenv').config();
const path = require('path');

connectDB();
const server = express();
const port = process.env.SERVER_PORT || 5000;
const expressPrefix = '[express]';

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use('/api/users', require('./routes/usersRouter'));
server.use('/api/files', require('./routes/filesRouter'));
server.use('/api/invites', require('./routes/invitesRouter'));
server.use(errorHandler);

server.listen(port, () => {
    console.log(`${expressPrefix} listening on port: ${port}`.yellow)
});