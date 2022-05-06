const express = require('express');
const server = express();
const port = process.env.SERVER_PORT || 5000;
const colors = require('colors');

server.use('/api/users', require('./routes/usersRouter'));
server.use('/api/files', require('./routes/filesRouter'));

server.listen(port, () => {
    console.log(`listening on port: ${port}`.yellow)
});
