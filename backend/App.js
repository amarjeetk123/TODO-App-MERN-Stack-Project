require("dotenv").config();
const express = require("express")
const app = express()
var cors = require('cors')
const userRoutes  = require("./routes/userRoutes")

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

const connectToDB = require("./config/database")
connectToDB();


app.use("/" ,userRoutes )

// query@ineuron.ai 

module.exports = app ;