const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    likes:{
        type:Array,
        default: [],
    },
    numberOflikes:{
        type: Number,
        default: 0,
    }
  },
  { timestamps: true }
);

const comment = mongoose.model("Comment", commentSchema);
module.exports = comment;
