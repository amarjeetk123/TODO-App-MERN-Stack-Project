const mongoose = require("mongoose");
const {MONGO_URL}  = process.env ;

const connectToDB = () =>{
    mongoose.connect(MONGO_URL , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        family: 4,
    } ).then( (res) =>{
         console.log("DB connection succesfull")
    } ).catch((err) =>{
        console.log(err.message)
        console.log("DB connection failed")
    })
}

module.exports = connectToDB;