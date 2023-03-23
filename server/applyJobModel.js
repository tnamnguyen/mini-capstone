const mongoose = require ('mongoose');

const applyJobSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },

    job_id: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('ApplyJob', applyJobSchema)