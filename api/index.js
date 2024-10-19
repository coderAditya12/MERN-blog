const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");
const postRoute = require("./routes/post.route");
const dotenv = require("dotenv");
const commentRoute = require("./routes/comment.route")
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
const cors = require("cors");

//routes
const app = express();

//Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Replace this with the Vite development server URL
    credentials: true, // Allow cookies to be sent with requests
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(2323, () => {
  console.log("server is running on port 2323!!");
});
