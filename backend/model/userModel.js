const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "title is required"],
        trim: true,
        maxlength: [15, "Titlt must be less than 15 character"]
    },
    userId:{
        type:String,
        require: [true, "userId is required in order to create a todo"],
    },
    userEmail:{
        type:String,
        require: [true, "userEmail is required in order to create a todo"],
    },
    message: [{
        type: String,
        createdAt: { type: Date, default: Date.now() },
        updateAt: { type: Date, default: Date.now() },
    }
    ]
},
    { timestamps: true }
)

module.exports = mongoose.model("User", userSchema);