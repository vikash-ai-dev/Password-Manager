const mongoose = require('mongoose')

const passwordSchema = new mongoose.Schema({
    site:{
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    
    password: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Password',passwordSchema);