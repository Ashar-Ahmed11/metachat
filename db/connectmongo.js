const mongoose = require('mongoose')
mongoose.set("strictQuery", false);
const URI = 'mongodb+srv://asharahmed:ILOVEcars123@metachat.upily0h.mongodb.net/chatapp'

const connectToMongo = async() => {
  mongoose.connect(URI,await console.log('Connected To MongoDb'))
}
    


module.exports = connectToMongo