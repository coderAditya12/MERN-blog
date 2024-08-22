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
    next(errorHandler(400, "All fields are required"));
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
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    //sending the data without password
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {}
};
module.exports = { signUp, signIn };
