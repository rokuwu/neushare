const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    user: {
        type: 'string',
        required: [true, 'no user'] 
    },
    type: {
        type: 'string',
        required: [true, 'no type']
    },
    path: {
        type: 'string',
        required: [true, 'no path']
    },
    fullPath: {
        type: 'string',
        required: [true, 'no full path']
    }
},
{ timestamps: true }
);

module.exports = mongoose.model('File', fileSchema);