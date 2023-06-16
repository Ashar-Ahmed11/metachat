const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
    fullname: {
        type: String
    },
    email: {
        type: String,
        unique:true,
    },
    password: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }


});
module.exports = mongoose.model('user',userSchema)

