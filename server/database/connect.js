const mongoose = require('mongoose');
const colors = require('colors');

const prefix = '[db]';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`${prefix} connected to ${conn.connection.host}`.yellow);

    } catch(err) {
        console.log(`${prefix} ${err}`.red);
        process.exit(1);
    }
}

module.exports = connectDB;
