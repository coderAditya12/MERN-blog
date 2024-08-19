const express = require("express");
const app = express();
const { default: mongoose } = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

//routes
const userRoute = require('./routes/user.route');


//mongoDB connected

mongoose.connect(process.env.MONGO).then(() => {
  console.log("database connected");
}).catch((err)=>{
    console.log(err)
})


app.use(userRoute);


app.listen(2323, () => {
  console.log("server is running on port 3000!!");
});
