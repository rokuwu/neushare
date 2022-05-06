const express = require('express');
const usersRouter = require('./routes/usersRouter');
const server = express();
const port = process.env.SERVER_PORT || 5000;
const colors = require('colors');

server.use('/api/users', usersRouter);

server.listen(port, () => {
    console.log(`listening on port: ${port}`.yellow)
});
