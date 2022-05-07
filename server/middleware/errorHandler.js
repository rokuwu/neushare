const colors = require('colors');

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    //console.log(`${err.message}`.red.bold);
    //console.log(`${err.stack}`.red);

    res.status(statusCode);
    res.json({
        error: err.message,
        stack: process.env.NODE_ENV === 'dev' ? err.stack : null
    });
}

module.exports = errorHandler;