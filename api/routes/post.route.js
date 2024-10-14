const express = require('express');
const verifyToken = require('../utils/verifyUser')
const {create,getposts,deletepost,UpdatePost} = require('../controllers/post.controller');

const router = express.Router();
router.post('/create',verifyToken,create);
router.get("/getposts",getposts);
router.delete('/deletepost/:postId/:userId',verifyToken,deletepost)
router.put("/updatepost/:postId/:userId",verifyToken,UpdatePost);

module.exports = router;