const express = require("express");
const router = express.Router();
const { test } = require("../controllers/user.controller");

try {
  router.get("/test", test);
} catch (error) {
  console.log(error);
}

module.exports = router;
