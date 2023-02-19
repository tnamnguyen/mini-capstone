const mongoose = require('mongoose');


const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true,
        
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});



module.exports = mongoose.model('Job', jobSchema);