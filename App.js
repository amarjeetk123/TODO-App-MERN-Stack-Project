require("dotenv").config();
const express = require("express")
const app = express()

const userRoutes  = require("./routes/userRoutes")

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectToDB = require("./config/database")
connectToDB();


app.use("/" ,userRoutes )

module.exports = app ;