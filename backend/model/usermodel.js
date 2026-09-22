const mongoose = require('mongoose')
const {Schema} = mongoose;
const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('user',userSchema)