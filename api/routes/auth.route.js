const express = require("express");
const router = express.Router();
const {
  signUp,
  signIn,
  googleAuth,
} = require("../controllers/auth.controller");
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/google", googleAuth);

module.exports = router;
