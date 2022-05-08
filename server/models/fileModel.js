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
    }
},
{ timestamps: true }
);

module.exports = mongoose.model('File', fileSchema);