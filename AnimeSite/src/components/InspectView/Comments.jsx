import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import Separator from "../Separator";
import UserContext from "../UserContext";
import dateFormatter from "./DateFormatter";
import DropDown from "../DropDown";

import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { MdOutlineReply } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  IoIosCheckmarkCircleOutline,
  IoIosCloseCircleOutline,
} from "react-icons/io";

export default function Comments({ mangaID, chapterID = null }) {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [sort, setSort] = useState("Newest");
  const [refresh, setRefresh] = useState(false);

  // Fetch comments
  useEffect(() => {
    axios
      .get("/api/getComments", {
        params: {
          userID: user.length > 0 && user[0].userID,
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
            uploadDate: dateFormatter.createFormattedDate(),
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
    user &&
      axios
        .post(
          "/api/postReply",
          {
            userID: user[0].userID,
            mangaID: mangaID,
            chapterID: chapterID,
            content: replyContent.value,
            parent: commentID,
            uploadDate: dateFormatter.createFormattedDate(),
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then(() => {
          replyContent.value = "";
          toggleRefresh();
        })
        .catch((error) => console.error(`Failed to post comment:`, error));
  }

  function handleDelete(comment) {
    axios
      .delete(`/api/deleteComment/${comment.commentID}`)
      .then(() => toggleRefresh())
      .catch((error) => console.error(`Failed to delete comment:`, error));
  }

  function handleEdit(commentID) {
    const editBox = document.getElementById(`editBox${commentID}`);
    axios
      .post(`/api/editComment`, {
        commentID: commentID,
        content: editBox.value,
      })
      .then(() => {
        toggleRefresh();
        editBox.value = "";
      })
      .catch((error) => console.error(`Failed to delete comment:`, error));
  }

  function handleReaction(commentID, reaction) {
    axios
      .post("/api/setReaction", {
        userID: user[0].userID,
        commentID: commentID,
        reaction: reaction,
      })
      .then(() => toggleRefresh())
      .catch((error) => console.error(`Failed to react:`, error));
  }

  const DisplayUser = ({ comment }) => {
    const userToDisplay = users.find((u) => u.userID === comment.userID);
    return (
      <div className="flex items-center">
        <img
          src={`${userToDisplay.profilePicture}`}
          className="hover:cursor-pointer size-12"
        />
        <div className="flex text-[18px] pl-2 hover:cursor-pointer hover:text-primary">
          <div>{userToDisplay.username}</div>
          <div className="flex items-center text-dimWhite text-[14px]">
            <div className="size-1 rounded-full bg-dimWhite mx-2" />
            {dateFormatter.getFormattedDate(comment.uploadDate) ?? "now"}
            {comment.edited === 1 && (
              <div className="text-[12px] mx-1">(edited)</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const DisplayOptions = ({ comment, toggleEditing }) => {
    const [showReplyBox, setShowReplyBox] = useState(false);
    const [reaction, setReaction] = useState(comment.reaction);

    const icons = [
      {
        icon: (
          <AiFillLike
            className={`${reaction === "like" ? "text-primary" : ""}`}
          />
        ),
        count: comment.likes,
        tooltip: "Like",
        onClick: () => {
          const newReaction = reaction === "like" ? "abstain" : "like";
          setReaction(newReaction);
          handleReaction(comment.commentID, newReaction);
        },
      },
      {
        icon: (
          <AiFillDislike
            className={`${reaction === "dislike" ? "text-primary" : ""}`}
          />
        ),
        count: comment.dislikes,
        tooltip: "Dislike",
        onClick: () => {
          const newReaction = reaction === "dislike" ? "abstain" : "dislike";
          setReaction(newReaction);
          handleReaction(comment.commentID, newReaction);
        },
      },
      {
        icon: <MdOutlineReply onClick={() => setShowReplyBox(!showReplyBox)} />,
        tooltip: "Reply",
      },
      {
        icon: (
          <FaEdit
            className={`${
              user.length === 0 ||
              (user[0].accessLevel === 0 && user[0].userID !== comment.userID)
                ? "hidden"
                : ""
            }`}
            onClick={() => toggleEditing()}
          />
        ),
        tooltip: "Edit",
      },
      {
        icon: (
          <MdDelete
            className={`${
              user.length === 0 ||
              (user[0].accessLevel === 0 && user[0].userID !== comment.userID)
                ? "hidden"
                : ""
            }`}
            onClick={() => handleDelete(comment)}
          />
        ),
        tooltip: "Delete",
      },
    ];

    const signedOutIcons = [
      {
        icon: (
          <AiFillLike
            className={`hover:cursor-pointer hover:text-primary`}
            onClick={() => console.log(`Add login request feature.`)}
          />
        ),
        count: comment.likes,
        tooltip: "Like",
      },
      {
        icon: (
          <AiFillDislike
            className={`hover:cursor-pointer hover:text-primary`}
            onClick={() => console.log(`Add login request feature.`)}
          />
        ),
        count: comment.dislikes,
        tooltip: "Dislike",
      },
      {
        icon: (
          <MdOutlineReply
            className={`hover:cursor-pointer hover:text-primary`}
            onClick={() => console.log(`Add login request feature.`)}
          />
        ),
        tooltip: "Reply",
      },
      {
        icon: (
          <FaEdit
            className={`hover:cursor-pointer hover:text-primary`}
            onClick={() => console.log(`Add login request feature.`)}
          />
        ),
        tooltip: "Edit",
      },
      {
        icon: (
          <MdDelete
            className={`hover:cursor-pointer hover:text-primary`}
            onClick={() => console.log(`Add login request feature.`)}
          />
        ),
        tooltip: "Delete",
      },
    ];

    return (
      <>
        <div className="flex mt-2 items-center">
          {user.length > 0 ? (
            <>
              {/* Logged In User POV */}
              {icons.map((item, index) => (
                <div
                  key={index}
                  className="mx-1 icon-container hover:text-primary hover:cursor-pointer text-[20px] transition-colors duration-200"
                  title={item.tooltip}
                  onClick={() => {
                    if (item.onClick) {
                      item.onClick();
                    }
                  }}
                >
                  <div className={`flex items-center`}>
                    {item.icon}
                    {item.count !== undefined && (
                      <span className="ml-1">{item.count}</span>
                    )}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {/* Logged Out User POV */}
              {signedOutIcons.map((item, index) => (
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
            </>
          )}
        </div>
        {showReplyBox && (
          <div className="mt-2">
            <textarea
              id={`replyBox${comment.commentID}`}
              placeholder="Reply..."
              className="w-full min-h-[25px] max-h-[300px] border-2 border-primary rounded-md bg-secondary place-content-center px-2"
            />
            <div className="w-full flex justify-end">
              <button
                className="bg-primary hover:cursor-pointer hover:bg-purple-800 px-4 rounded-md"
                onClick={() => handleReply(comment.commentID)}
              >
                Post
              </button>
            </div>
          </div>
        )}
      </>
    );
  };

  const DisplayArea = () => {
    const DisplayComment = ({ comment }) => {
      const [collapsed, setCollapsed] = useState(false);
      const [editing, setEditing] = useState(false);
      const [content, setContent] = useState(comment.content);

      const handleToggleCollapse = () => {
        setCollapsed(!collapsed);
      };

      const toggleEditing = () => {
        setEditing(!editing);
      };

      return (
        <div className="border-l-2 border-primary my-2 pl-6">
          <div className="w-full flex justify-between">
            {users.length > 0 && <DisplayUser comment={comment} />}
            <button
              onClick={handleToggleCollapse}
              className="text-white -translate-x-[10px]"
            >
              {collapsed ? <FaChevronDown /> : <FaChevronUp />}
            </button>
          </div>

          {collapsed ? (
            <div className="text-[12px] font-bold leading-[2px] mt-2 ml-2 tracking-widest">
              ...
            </div>
          ) : (
            <>
              {editing ? (
                <div className="flex items-center">
                  <textarea
                    id={`editBox${comment.commentID}`}
                    className="w-full text-[16px] place-content-center px-2 mt-2 ml-2 bg-secondary border-2 border-primary rounded-md"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <div className="mx-4 space-y-2">
                    <IoIosCheckmarkCircleOutline
                      className="size-7 mt-2 transition-colors duration-200 hover:cursor-pointer hover:text-primary"
                      onClick={() => handleEdit(comment.commentID)}
                    />
                    <IoIosCloseCircleOutline
                      className="size-7 transition-colors duration-200 hover:cursor-pointer hover:text-red-500"
                      onClick={() => toggleEditing()}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-[16px] leading-2 mt-2 ml-2">
                  {comment.content}
                </div>
              )}

              <DisplayOptions comment={comment} toggleEditing={toggleEditing} />
              {/* Recursively render replies */}
              {comment.replies &&
                comment.replies.map((reply) => (
                  <DisplayComment key={reply.commentID} comment={reply} />
                ))}
            </>
          )}
        </div>
      );
    };

    return (
      <div>
        {comments.map((comment) => (
          <DisplayComment key={comment.commentID} comment={comment} />
        ))}
      </div>
    );
  };

  const InputArea = () => {
    return (
      <>
        <textarea
          id="commentBox"
          placeholder="Share your thoughts..."
          className="w-full min-h-[25px] max-h-[300px] border-2 border-primary rounded-md bg-secondary place-content-center px-2"
        />
        <div className="w-full flex justify-end">
          {user.length > 0 ? (
            <button
              className="bg-primary hover:cursor-pointer hover:bg-purple-800 px-4 rounded-md"
              onClick={handleSubmit}
            >
              Post
            </button>
          ) : (
            <button
              className="bg-primary hover:cursor-pointer hover:bg-purple-800 px-4 rounded-md"
              onClick={() => console.log(`Add login request feature.`)}
            >
              Post
            </button>
          )}
        </div>
      </>
    );
  };

  return (
    <section className="w-full bg-quaternary h-auto mt-10 p-4 font-poppins text-white">
      <div className="w-full flex justify-between items-center">
        <div>Comments</div>
        <DropDown
          options={["Newest", "Oldest", "Most Liked", "Most Disliked"]}
          value={sort}
          func={setSort}
          className="w-[125px] justify-between px-2 -translate-y-1"
        />
      </div>
      <Separator />
      <InputArea />
      <DisplayArea />
    </section>
  );
}

{
  /* <DropDown
options={["OnGoing", "Completed", "Hiatus", "Dropped", "Coming Soon"]}
value={status}
func={setStatus}
className="w-[118px] justify-evenly pb-2 pr-2 rounded-md"
inspectWidth={"w-[150px] px-2 -translate-x-6"}
/> */
}
