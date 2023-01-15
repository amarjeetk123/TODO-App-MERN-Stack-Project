require("dotenv").config();
const express = require("express")
const app = express()
var cors = require('cors')
const userRoutes  = require("./routes/userRoutes")

// const corsOptions ={
//     origin: "http://localhost:" + (process.env.PORT || 5000),
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const connectToDB = require("./config/database")
connectToDB();


app.use("/" ,userRoutes )

// query@ineuron.ai 

module.exports = app ;