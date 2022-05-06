const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'no user'] 
    },
    type: {
        type: 'string',
        required: [true, 'no type']
    },
    url: {
        type: 'string',
        required: [true, 'no url']
    }
},
{ timestamps: true }
);

module.exports = mongoose.model('File', fileSchema);