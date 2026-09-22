const mongoose = require('mongoose')
const {Schema} = mongoose;
const imageSchema = new Schema({
    image :{
        type : String,
        require : true
    }

}, {
    timestamps: true
})
module.exports = mongoose.model('image',imageSchema)