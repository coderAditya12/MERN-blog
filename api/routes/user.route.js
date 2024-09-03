const express = require("express");
const router = express.Router();
const verifyToken = require("../utils/verifyUser");
const {
  test,
  updateUser,
  deleteUser,
  signOut,
} = require("../controllers/user.controller");
router.get("/test", test);
router.put("/update/:userId", verifyToken, updateUser);
router.delete('/delete/:userId',verifyToken,deleteUser)
router.post('/signout',signOut);
module.exports = router;
