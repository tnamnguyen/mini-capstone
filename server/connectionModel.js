const mongoose = require('mongoose');


const connectionSchema = new mongoose.Schema({
    user1: {
        type: String,
        required: true
    },
    user2: {
        type: String,
        required: true,
        
    },
    status: {
        type: String,
    }
});



module.exports = mongoose.model('Connection', connectionSchema);