import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaRegThumbsUp } from "react-icons/fa6";
const Comment = ({ comment, onLike }) => {
  const [user, setUser] = useState({});
  console.log(user);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();

        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);
  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          src={user.profilePicture}
          alt={user.username}
          className="w-10 h-10 rounded-full bg-gray-200"
        />
      </div>
      <div className="flex-1">
        <div className=" flex items-center mb-1">
          <span className="font-bold mr-1 text-sm truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
        </div>
        <span className="text-gray-500 text-sm">
          {moment(comment.createdAt).fromNow()}
        </span>
        <p className="text-gray-500 pb-2">{comment.content}</p>
        <div className=" ">
          <button
            className="text-gray-400 hover:text-blue-500"
            type="button"
            onClick={() => onLike(comment._id)}
          >
            <FaRegThumbsUp className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
