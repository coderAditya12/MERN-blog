const comment = require("../models/comment.model");
const { errorHandler } = require("../utils/error");
const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;
    if (userId !== req.user.id) {
      return next(
        errorHandler(403, "you are not allowed to create this comment")
      );
    }
    const newComment = await comment.create({
      content,
      postId,
      userId,
    });
    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};

const getPostComment = async (req, res, next) => {
  try {
    const comments = await comment
      .find({ postId: req.params.postId })
      .sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
module.exports = { createComment, getPostComment };
