const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    sentAt: {
        type: Date,
        default: Date.now
    },
    attachment: {
        type: {
            type: String,
            enum: ['image', 'file']
        },
        url: String
    },
    adminOnly: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Message', messageSchema);
