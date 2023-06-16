const express = require('express')
const fetchUser = require('../middleware/fetchUser')
const router = express.Router()
const Message = require('../models/Message')

const PubNub = require('pubnub');


router.get('/getallmessages/:roomid',fetchUser,async(req,res)=>{
        const messages = await Message.find({roomId:req.params.roomid})
        res.send(messages)
})

router.post('/createmessage/:id/:roomid',fetchUser,async(req,res)=>{
    
    try {



          
const pubnub = new PubNub({
    publishKey: "pub-c-e5c44449-a3cf-4996-a063-f7285380f338",
    subscribeKey: "sub-c-bda7266f-a825-4795-8563-c2837f58e4e1",
    userId: req.params.id,
  });



          
        const userId = req.user.id
        const message = await Message.create({
            content:req.body.content,
            senderId:userId,
            receiverId:req.params.id,
            roomId:req.params.roomid}) 


            
           
                await pubnub.publish({
                  channel:req.params.roomid,
                  message,
                });
 
        res.send(message)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Some Internal Server Error')
    }
})

router.delete('/deletemessage/:id',fetchUser,async(req,res)=>{
    try {
        
        const deletedMessage = await Message.findByIdAndDelete(req.params.id)
        res.send(deletedMessage)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Some Internal Server error')
    }
})
router.put('/editmessage/:id',fetchUser,async(req,res)=>{
    try {
        
        const editedMessage = await Message.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.send(editedMessage)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Some Internal Server error')
    }
})

module.exports = router