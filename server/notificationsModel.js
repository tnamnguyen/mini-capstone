const mongoose = require ('mongoose');

const notificationsSchema = new mongoose.Schema({

    time_stamp:{
        type: String,
        required: true
    },

    user_id: {
        type: String,
        required: true
    },

    object_id: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true
    },

    favorite: {
        type: Boolean,
        required: true
    },

    action: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Notifications', notificationsSchema)