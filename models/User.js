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
    },
    notificationId:{
        type:String
    }

});

const User = mongoose.model('user',userSchema)
User.createIndexes()

module.exports= User

