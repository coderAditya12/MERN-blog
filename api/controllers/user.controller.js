const user = require("../models/user");
const { errorHandler } = require("../utils/error");
const bcrypt = require("bcryptjs");
const test = (req, res) => {
  res.json({ message: "Api is working" });
};

const updateUser = async (req, res, next) => {
  if (!req.user) {
    return next(errorHandler(401, "Unauthorized"));
  }
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "you are not allowed to update this user"));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(
        errorHandler(400, "password must be at least 6 characters long")
      );
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "username must be between 7 and 20 characters long")
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "username cannot contain spaces"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "username must be lowercase"));
    }
    if (!req.body.username.match(/^[a-zA-Z)-9]+$/)) {
      return next(
        errorHandler(400, "username can only contain letters and numbers")
      );
    }
  }
  try {
    const updateUser = await user.findByIdAndUpdate(
      req.params.userId,

      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  console.log("Authorization Header:", req.cookies.access_token);
  console.log("req.user:", req.user);
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this user."));
  }
  try {
    await user.findByIdAndDelete(req.params.userId);
    res.status(200).json("User deleted successfully");
  } catch (error) {
    return next(error);
  }
};

const signOut = (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User signed out successfully");
  } catch (error) {
    next(error);
  }
};
module.exports = { test, updateUser, deleteUser, signOut };
