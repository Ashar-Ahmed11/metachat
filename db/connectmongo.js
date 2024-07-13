const mongoose = require('mongoose')
mongoose.set("strictQuery", false);
const URI = 'mongodb+srv://asharahmed:ILOVEcars123@metachat.upily0h.mongodb.net/chatapp'

const connectToMongo = async() => {

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  };
  
  mongoose.connect(URI, options)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));
}
    


module.exports = connectToMongo