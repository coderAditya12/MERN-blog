const express = require("express");
const app = express();
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

//mongoDB connected
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });

//routes
const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

app.listen(2323, () => {
  console.log("server is running on port 3000!!");
});
