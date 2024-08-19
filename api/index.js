const express = require("express");
const { default: mongoose } = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
const app = express();

//mongoDB connected

mongoose.connect(process.env.MONGO).then(() => {
  console.log("database connected");
}).catch((err)=>{
    console.log(err)
})

app.listen(3000, () => {
  console.log("server is running on port 3000!!");
});
