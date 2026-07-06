const mongoose = require('mongoose')
mongoose.set("strictQuery", false);
const URI = 'mongodb+srv://akhuwat:UIAZGDS@akhuwat-database.l9ey8xt.mongodb.net/metachatdb?retryWrites=true&w=majority&appName=akhuwat-database'

// const connectToMongo = async() => {
//   mongoose.connect(URI,await console.log('Connected To MongoDb'))
// }
    

const connectToMongo = () => mongoose.connect(URI, () => {
    console.log("Connected to Mongo Successfully")
})

module.exports = connectToMongo