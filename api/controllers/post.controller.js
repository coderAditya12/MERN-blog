const { errorHandler } = require("../utils/error");
const Post = require("../models/post");

const create = async (req, res, next) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      return next(errorHandler(403, "You are not allowed to create a post"));
    }
    if (!req.body.title || !req.body.content) {
      return next(errorHandler(400, "Please provide all required fields"));
    }
    const slug = req.body.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "-");
    const newPost = await Post.create({
      ...req.body,
      slug,
      userId: req.user.id,
    });
    res.status(201).json(newPost);
  } catch (error) {
      next(error);
  }
};

module.exports = create;
