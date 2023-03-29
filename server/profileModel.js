const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: false
    },
    pastJob: {
        type: String,
        required: false
    },
    currentJob: {
        type: String,
        required: false
    },
    languages: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Profile', profileSchema);