const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    _id: {
      type: ObjectId,
      required: true
    },
    education: {
        type: String,
        required: true
    },
    pastJob: {
        type: String,
        required: true
    },
    currentJob: {
        type: String,
        required: true
    },
    languages: {
      type: String,
      required: true
    },
    bio: {
      type: String,
      required: true
    }
});

module.exports = mongoose.model('Profile', profileSchema);