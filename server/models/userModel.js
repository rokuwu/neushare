const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: 'string',
        required: [true, 'no username'] 
    },
    email: {
        type: 'string',
        required: [true, 'no email']
    },
    password: {
        type: 'string',
        required: [true, 'no password']
    },
    admin: {
        type: 'boolean',
        default: false,
        required: [true, 'no admin status defined']
    },
    token: {
        type: 'string',
        default: null
    }
},
{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);