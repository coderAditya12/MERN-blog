import { Alert, Button, Textarea, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Comment from "./Comment";

const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState("");
  const [commentError, setcommentError] = useState(null);
  const [totalComments, setTotalComments] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comments.length > 200) {
      return;
    }
    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comments,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComments("");
        setcommentError(null);
        // Fetch updated comments after successful submission
        getComments();
      }
    } catch (error) {
      setcommentError(error.message);
    }
  };

  const getComments = async () => {
    try {
      const res = await fetch(`/api/comment/getPostComments/${postId}`);
      const data = await res.json();
      if (res.ok) {
        setTotalComments(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getComments();
  }, [postId]);

  return (
    <div className="max-w-2xl mx-auto w-full p-3 ">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            className="h-5 w-5 object-cover rounded-full "
            src={currentUser.profilePicture}
            alt=""
          />
          <Link
            to={`/dashboard?tab=profile`}
            className="text-xs text-cyan-600 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to comment.
          <Link to={`/sign-in`} className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          className="border border-teal-500 rounded-md p-3"
          onSubmit={handleSubmit}
        >
          <Textarea
            placeholder="Add a comment..."
            rows="3"
            maxLength="200"
            onChange={(e) => setComments(e.target.value)}
            value={comments}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-xs">
              {200 - comments.length} characters remaining
            </p>
            <Button outline gradientDuoTone="purpleToBlue" type="submit">
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {totalComments.length === 0 ? (
        <p className="text-sm my-5">No comments yet!</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p className="text-sm my-5 flex items-center">Comments</p>
            <div className="border border-gray-400 py-1 px-2 rounded-sm ">
              <p>{totalComments.length}</p>
            </div>
          </div>
          {totalComments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </>
      )}
    </div>
  );
};

export default CommentSection;
