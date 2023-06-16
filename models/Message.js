const mongoose = require('mongoose')
const { Schema } = mongoose;

const messageSchema = new Schema({
   
    content:{
        type:String
    },
    senderId:{
       type:String
    },
    receiverId:{
        type:String
    }
    ,
    roomId:{
        type:String
    },
    date: {
        type: Date,
        default: Date.now
    }


});

const Message = mongoose.model('message',messageSchema)
Message.createIndexes()

module.exports= Message

