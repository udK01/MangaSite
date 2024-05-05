import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import Separator from "../Separator";
import UserContext from "../UserContext";

import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { MdOutlineReply } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Comments({ mangaID, chapterID = null }) {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // Fetch comments
  useEffect(() => {
    axios
      .get("/api/getComments", {
        params: {
          mangaID: mangaID,
          chapterID: chapterID,
        },
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => setComments(response.data))
      .catch((error) => console.error(`Failed to fetch comments:`, error));
  }, [mangaID, chapterID, refresh]);

  // Fetch users
  useEffect(() => {
    axios
      .get(`/api/users`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(`Failed to fetch users:`, error));
  }, []);

  function toggleRefresh() {
    setRefresh(!refresh);
  }

  function handleSubmit() {
    const commentContent = document.getElementById("commentBox");
    user &&
      axios
        .post(
          "/api/postComment",
          {
            userID: user[0].userID,
            mangaID: mangaID,
            chapterID: chapterID,
            content: commentContent.value,
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then(() => {
          commentContent.value = "";
          toggleRefresh();
        })
        .catch((error) => console.error(`Failed to post comment:`, error));
  }

  function handleReply(commentID) {
    const replyContent = document.getElementById(`replyBox${commentID}`);
    console.log(replyContent.value);
  }

  const DisplayUser = ({ id }) => {
    const userToDisplay = users.find((u) => u.userID === id);
    return (
      <div className="flex items-center">
        <img src={`${userToDisplay.profilePicture}`} />
        <div className="pl-2">{userToDisplay.username}</div>
      </div>
    );
  };

  const DisplayOptions = (comment) => {
    const [showReplyBox, setShowReplyBox] = useState(false);

    const icons = [
      { icon: <AiFillLike />, count: comment.comment.likes, tooltip: "Like" },
      {
        icon: <AiFillDislike />,
        count: comment.comment.dislikes,
        tooltip: "Dislike",
      },
      {
        icon: <MdOutlineReply onClick={() => setShowReplyBox(!showReplyBox)} />,
        tooltip: "Reply",
      },
      { icon: <FaEdit />, tooltip: "Edit" },
      { icon: <MdDelete />, tooltip: "Delete" },
    ];

    return (
      <>
        <div className="flex mt-2 items-center">
          {icons.map((item, index) => (
            <div
              key={index}
              className="mx-1 icon-container hover:text-primary hover:cursor-pointer text-[20px] transition-colors duration-200"
              title={item.tooltip}
            >
              <div className="flex items-center">
                {item.icon}
                {item.count !== undefined && (
                  <span className="ml-1">{item.count}</span>
                )}
              </div>
            </div>
          ))}
        </div>
        {showReplyBox && (
          <div className="mt-2">
            <textarea
              id={`replyBox${comment.comment.commentID}`}
              placeholder="Reply..."
              className="w-full min-h-[25px] max-h-[300px] border-2 border-primary rounded-md bg-secondary place-content-center px-2"
            />
            <div className="w-full flex justify-end">
              <button
                className="bg-primary hover:cursor-pointer hover:bg-purple-800 px-4 rounded-md"
                onClick={() => handleReply(comment.comment.commentID)}
              >
                Post
              </button>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <section className="w-full bg-quaternary h-auto mt-10 p-4 font-poppins text-white">
      <div>Comments</div>
      <Separator />
      {/* Input Area */}
      <textarea
        id="commentBox"
        placeholder="Share your thoughts..."
        className="w-full min-h-[25px] max-h-[300px] border-2 border-primary rounded-md bg-secondary place-content-center px-2"
      />
      <div className="w-full flex justify-end">
        <button
          className="bg-primary hover:cursor-pointer hover:bg-purple-800 px-4 rounded-md"
          onClick={handleSubmit}
        >
          Post
        </button>
      </div>
      {/* Display Area */}
      {comments.length > 0 &&
        comments.map((comment) => (
          <div
            key={comment.commentID}
            className="border-2 border-primary rounded-md my-2 p-2"
          >
            {users.length > 0 && <DisplayUser id={comment.userID} />}
            <div className="ml-1">{comment.content}</div>
            <DisplayOptions comment={comment} />
          </div>
        ))}
    </section>
  );
}
