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
const likeComment = async (req, res, next) => {
  try {
    const commentDoc = await comment.findById(req.params.commentId);
    if (!commentDoc) {
      return next(errorHandler(404, "Comment not found"));
    }

    const userIndex = commentDoc.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      // Like the comment
      commentDoc.numberOflikes += 1; // Note: lowercase 'l' to match schema
      commentDoc.likes.push(req.user.id);
    } else {
      // Unlike the comment
      commentDoc.numberOflikes -= 1; // Note: lowercase 'l' to match schema
      commentDoc.likes.splice(userIndex, 1);
    }

    // Save the changes to database
    await commentDoc.save();

    res.status(200).json(commentDoc);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const editComment = async (req, res, next) => {
  try {
    const isComment = await comment.findById(req.params.commentId);
    if (!isComment) {
      return next(errorHandler(404, "Comment not found"));
    }
    if (isComment.userId !== req.user.id && !req.user.Admin) {
      return next(
        errorHandler(403, "you are not allowed to edit this comment")
      );
    }
    const editedcomment = await comment.findByIdAndUpdate(
      req.params.commentId,
      { content: req.body.content },
      { new: true }
    );
    res.status(200).json(editedcomment);
  } catch (error) {
    next(error);
  }
};
const deleteComment = async () => {
  try {
    const isComment = await comment.findById(req.params.commentId);
    if (!isComment) {
      return next(errorHandler(404, "Comment not found"));
    }
    if (isComment.userId !== req.user.id && !req.user.Admin) {
      return errorHandler(403, "you are not allowed to delete this comment");
    }
    await comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json("comment has been deleted");
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createComment,
  getPostComment,
  likeComment,
  editComment,
  deleteComment,
};
