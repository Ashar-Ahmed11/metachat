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

const Rooms = mongoose.model('rooms',roomSchema)
Rooms.createIndexes()

module.exports= Rooms

