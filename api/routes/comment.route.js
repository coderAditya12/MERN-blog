const express = require("express");
const router = express.Router();
const verifyToken = require("../utils/verifyUser");
const { createComment,getPostComment } = require("../controllers/comment.controller");
router.post("/create", verifyToken, createComment);
router.get('/getPostComments/:postId',getPostComment);

module.exports = router;

