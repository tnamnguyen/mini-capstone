const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userID:{
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    reference:{
        type: String,
        required: true
    }, 
    message:{
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Notification', notificationSchema);
