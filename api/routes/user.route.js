const express = require("express");
const verifyToken = require("../utils/verifyUser");
const {
  test,
  updateUser,
  deleteUser,
  signOut,
  getUsers,
  getUser
} = require("../controllers/user.controller");
const router = express.Router();
router.get("/test", test);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/signout", signOut);
router.get("/getusers", verifyToken, getUsers);
router.get('/:userId',getUser);
module.exports = router;