const mongoose = require('mongoose')
mongoose.set("strictQuery", false);
const URI = 'mongodb+srv://asharahmed:ILOVEcars123@metachat.upily0h.mongodb.net/chatapp'

const connectToMongo = async() => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 50000, // Increase the timeout value
      socketTimeoutMS: 45000, // Increase the timeout value
   
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    // Retry connection after a delay if needed
    setTimeout(connectToMongo, 5000);
  }
}
    


module.exports = connectToMongo