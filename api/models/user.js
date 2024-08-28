const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://cdn.vectorstock.com/i/1000v/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.jpg",
    },
  },
  { timestamps: true }
);

const user = mongoose.model("user", userSchema);

module.exports = user;
