const express = require("express");
const router = express.Router();
const verifyToken = require("../utils/verifyUser");
const { createComment,getPostComment,likeComment } = require("../controllers/comment.controller");
router.post("/create", verifyToken, createComment);
router.get('/getPostComments/:postId',getPostComment);
router.put('/likeComment/:commentId',verifyToken,likeComment)
module.exports = router;

