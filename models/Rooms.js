const mongoose = require('mongoose')
const { Schema } = mongoose;

const roomSchema = new Schema({
   
    users: [{name:{
        type:String
    }}],
    date: {
        type: Date,
        default: Date.now
    }


});

module.exports = mongoose.model('room',roomSchema)

