require("dotenv").config();
const express = require("express")
const app = express()

const userRoutes  = require("./routes/userRoutes")

// to serve the frontend
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectToDB = require("./config/database")
connectToDB();


app.use("/" ,userRoutes )

// query@ineuron.ai 

module.exports = app ;