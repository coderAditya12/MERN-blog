const express = require("express");
const {
  signUp,
  signIn,
  googleAuth,
} = require("../controllers/auth.controller");
const router = express.Router();
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/google", googleAuth);

module.exports = router;
