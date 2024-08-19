const user = require("../models/user");
const bcrypt = require("bcryptjs");
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
module.exports = { signUp };
