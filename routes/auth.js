const express = require('express')
const router = express.Router()
const User = require('../models/User')
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'ashar.2day'
const fetchUser = require('../middleware/fetchUser')

router.post('/signup', async (req, res) => {
    try {

        const email = await User.findOne({ email: req.body.email })
        if (email) {
            return res.status(409).json({ error: 'A user with this email already exists!' })
        }
        else {
            const salt = await bcrypt.genSalt(10)
            const hashPass = await bcrypt.hash(req.body.password, salt)
            const data = { fullname: req.body.fullname, email: req.body.email, password: hashPass }
            const user = await User.create(data)
            const jwtData = {
                id: user._id
            }
            const token = await jwt.sign(jwtData, JWT_SECRET)
            res.json({ authToken: token })
    
        }

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some Internal Server Error")
    }
})


router.post('/login', async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(401).json({ error: 'Please Enter Correct Credentials!' })
        }
        const password = await bcrypt.compare(req.body.password, user.password)
        if (!password) {
            return res.status(401).json({ error: 'Please Enter Correct Credentials!' })
        }
        const data = {
            id: user._id
        }
        const token = await jwt.sign(data, JWT_SECRET)
        res.json({ authToken: token })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some Internal Server Error")
    }
})

router.get('/getuser', fetchUser, async (req, res) => {
    try {

        const userId = req.user.id
        const user = await User.findById(userId).select('-password')
        res.send(user)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("INTERNAL SERVER ERROR")
    }
})



// router.put('/editfield',async(req,res)=>{
//     const room = await User.update({},{$set : {"notificationId":'ashar'}},{upsert:false,multi:true}) 
//     res.send(room)
// })

router.put('/notificationcontroller/:tokenId',fetchUser,async(req,res)=>{
    try {
        const addToken = await User.findByIdAndUpdate(req.user.id,{$set:{notificationId:req.params.tokenId}},{new:true})
        res.send(addToken)


        
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Some Internal Server Error')
    }
})
module.exports = router