const express = require("express");
const router = express.Router();
const verifyToken = require("../utils/verifyUser");
const {
  createComment,
  getPostComment,
  likeComment,
  editComment,
} = require("../controllers/comment.controller");
router.post("/create", verifyToken, createComment);
router.get('/getPostComments/:postId',getPostComment);
router.put('/likeComment/:commentId',verifyToken,likeComment)
router.put('/editComment/:commentId',verifyToken,editComment)
module.exports = router;

