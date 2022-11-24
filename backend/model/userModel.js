const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    title:{
        type: String,
        require : [true , "title is required"],
    },
    message:{
        type : String
    }
})

module.exports = mongoose.model("User" , userSchema);