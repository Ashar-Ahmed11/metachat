const mongoose = require('mongoose')
mongoose.set("strictQuery", false);
const URI = 'mongodb+srv://asharahmed:ILOVEcars123@metachat.upily0h.mongodb.net/chatapp'

const connectToMongo = async () => {
  try {
    await mongoose.connect(URI)
    console.log("Connect to MongoDB successfully")
  } catch (error) {
    console.log("Connect failed " + error.message)
  }
}



module.exports = connectToMongo