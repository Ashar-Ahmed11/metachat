const mongoose = require('mongoose')
mongoose.set("strictQuery", false);
const URI = 'mongodb+srv://asharahmed:ILOVEcars123@metachat.upily0h.mongodb.net/chatapp'

mongoose.connect(URI, () => {     console.log("connected to mongo..") });


module.exports = connectToMongo