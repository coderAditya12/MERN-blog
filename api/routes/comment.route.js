const express = require("express");
const router = express.Router();
const verifyToken = require("../utils/verifyUser");
const { createComment } = require("../controllers/comment.controller");
router.post("/create", verifyToken, createComment);

module.exports = router;

