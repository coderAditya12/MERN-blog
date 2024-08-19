const user = require('../models/user')
const bcrypt = require('bcryptjs');
const signUp = async (req, res) => {
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
       return res.status(400).json({ message: "All fields are required" });
     }
     const hashPassword = bcrypt.hashSync(password,10);//for encryption 
     
     const newUser = await user.create({
       username: username,
       email,
       password:hashPassword,
     });
     res.json("sing up successfull");
 } catch (error) {
    res.status(500).json({message:error.message});
 }
};
module.exports = { signUp };
