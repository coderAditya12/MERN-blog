const user = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { errorHandler } = require("../utils/error");
const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      return next(errorHandler(400, "All fields are required"));
    }
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return next(errorHandler(409, "Email already in use"));
    }
    const hashPassword = bcrypt.hashSync(password, 10); //for encryption

    const newUser = await user.create({
      username: username,
      email,
      password: hashPassword,
    });
    res.json("sing up successfull");
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }
  try {
    const validUser = await user.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "user not found"));
    }

    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }
    const token = jwt.sign(
      { id: validUser._id, Admin: validUser.isAdmin },
      process.env.JWT_SECRET
    );
    //sending the data without password
    const { password: pass, ...rest } = validUser._doc;
    console.log(token);
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 72 * 60 * 60 * 1000), // 24 hours
        // or
        // maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
      })
      .json(rest);
    return;
  } catch (error) {
    next(error);
  }
};

const googleAuth = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const googleUser = await user.findOne({ email });
    if (googleUser) {
      const token = jwt.sign(
        { id: googleUser._id, Admin: googleUser.isAdmin },
        process.env.JWT_SECRET
      );
      console.log(token);
      const { password, ...rest } = googleUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
          // or
          // maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
        })
        .json(rest);
      return;
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = await user.create({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashPassword,
        profilePicture: googlePhotoUrl,
      });
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      console.log(token);
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
          // or
          // maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
        })
        .json(rest);
      return;
    }
  } catch (error) {
    next(error);
  }
};
module.exports = { signUp, signIn, googleAuth };
