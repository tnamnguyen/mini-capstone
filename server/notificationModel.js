const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
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