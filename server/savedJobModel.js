const mongoose = require ('mongoose');

const savedJobSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },

    job_id: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('SavedJob', savedJobSchema)