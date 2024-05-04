import { useContext, useEffect, useState } from "react";
import axios from "axios";

import Separator from "../Separator";
import UserContext from "../UserContext";

export default function Comments({ mangaID, chapterID = null }) {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {}, [refresh]);

  function toggleRefresh() {
    setRefresh(!refresh);
  }

  function handleSubmit() {
    const commentContent = document.getElementById("commentBox").value;
    user &&
      axios
        .post(
          "/api/postComment",
          {
            userID: user[0].userID,
            mangaID: mangaID,
            chapterID: chapterID,
            content: commentContent,
          },
          { header: { "Content-Type": "application/json" } }
        )
        .then(() => (document.getElementById("commentBox").value = ""))
        .catch((error) => console.error(`Failed to post comment:`, error));
  }

  return (
    <section className="w-full bg-quaternary h-auto mt-10 p-4 font-poppins text-white">
      <div>Comments</div>
      <Separator />
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
    </section>
  );
}
