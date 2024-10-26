import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { FaThumbsUp } from "react-icons/fa";

const Comment = ({ comment, onLike }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();

        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getUser();
  }, [comment]);

  const handleLike = async () => {
    try {
      await onLike(comment._id);
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          src={user.profilePicture}
          alt={user.username}
          className="w-10 h-10 rounded-full bg-gray-200"
          onError={(e) => {
            e.target.src = "/default-avatar.png";
          }}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-sm truncate">
            {!isLoading ? `@${user.username}` : "Loading..."}
          </span>
        </div>
        <span className="text-gray-500 text-sm">
          {moment(comment.createdAt).fromNow()}
        </span>
        <p className="text-gray-500 pb-2">{comment.content}</p>
        <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
          <button
            className={`text-gray-400 hover:text-blue-500 ${
              currentUser &&
              comment.likes.includes(currentUser._id) &&
              "!text-blue-500"
            }`}
            type="button"
            onClick={handleLike}
          >
            <FaThumbsUp className="text-sm" />
          </button>
          <p className="text-gray-500">
            {comment.numberOflikes > 0 &&
              comment.numberOflikes +
                " " +
                (comment.numberOflikes === 1 ? "like" : "likes")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
