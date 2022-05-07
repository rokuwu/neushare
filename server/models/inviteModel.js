const mongoose = require('mongoose');

const inviteSchema = new mongoose.Schema({
    invite: {
        type: 'string',
        required: [true, 'no no invite'] 
    },
    used: {
        type: 'boolean',
        default: false
    },
    user: {
        type: 'string',
        default: null
    }
},
{ timestamps: true }
);

module.exports = mongoose.model('Invite', inviteSchema);