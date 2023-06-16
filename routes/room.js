const express = require('express')
const router = express.Router()
const Rooms = require('../models/Rooms')
const User = require('../models/User')
const fetchUser = require('../middleware/fetchUser')


const PubNub = require('pubnub');



router.get('/getallusers', fetchUser, async (req, res) => {
    const users = await User.find()
    res.send(users)
})

router.post('/createroom/:id', fetchUser, async (req, res) => {


 
    


    try {
       
       

          
const pubnub = new PubNub({
    publishKey: "pub-c-e5c44449-a3cf-4996-a063-f7285380f338",
    subscribeKey: "sub-c-bda7266f-a825-4795-8563-c2837f58e4e1",
    userId: 'syz',
  });


        const userId = req.user.id
        const getUser = await User.findById(userId)

        const anotherUser = await User.findById(req.params.id)

        const room = await Rooms.create({ users: [{ _id: getUser._id, name: getUser.fullname }, { _id: anotherUser._id, name: anotherUser.fullname }] })
        await pubnub.publish({
            channel:'homepage',
            message:room,
          });

      
        res.send(room)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Some Internal Server Error')
    }
})
router.get('/getallroom', fetchUser, async (req, res) => {

    try {



        const room = await Rooms.find()
        res.send(room)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Some Internal Server Error')
    }
})

router.delete('/deleteroom/:id', fetchUser, async (req, res) => {

    try {

        
          
const pubnub = new PubNub({
    publishKey: "pub-c-e5c44449-a3cf-4996-a063-f7285380f338",
    subscribeKey: "sub-c-bda7266f-a825-4795-8563-c2837f58e4e1",
    userId: req.params.id,
  });

        const deleteRoom = await Rooms.findByIdAndDelete(req.params.id)
        await pubnub.publish({
            channel:'homepage',
            message:deleteRoom,
          });
        res.send(deleteRoom)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Some Internal Server Error')
    }
})

// router.put('/editfield',async(req,res)=>{
//     const room = await Rooms.update({},{$unset : {"roomCreator":'ashar'}},{upsert:false,multi:true}) 
//     res.send(room)
// })
module.exports = router