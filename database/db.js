const mongoose = require('mongoose')

const mongoDbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err)); 
}

module.exports = mongoDbConnection; 