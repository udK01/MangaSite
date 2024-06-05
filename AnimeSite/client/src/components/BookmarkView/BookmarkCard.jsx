import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";

import StarRating from "../StarRating";
import UserContext from "../UserContext";

export default function BookmarkCard({ manga, showDelete, setBookmarks }) {
  const [hover, setHover] = useState(false);
  const { user } = useContext(UserContext);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  function removeBookmark() {
    axios
      .post(
        `/api/bookmark`,
        {
          userID: user[0].userID,
          mangaID: manga.mangaID,
          action: "remove",
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        setBookmarks(response.data);
        user[0].bookmarks = response.data;
        // user[0].bookmarks = response.data;
      })
      .catch((error) => console.error(`Failed to alter bookmarks:`, error));
  }

  return (
    <div className="w-full md:max-w-[142px] 2xs:max-w-[187px] h-full font-poppins rounded-md overflow-hidden flex flex-col ml-5 pb-5">
      {showDelete && (
        <button
          className="absolute px-4 py-0.5 bg-red-600 rounded-md text-white translate-x-[60px] z-20 hover:cursor-pointer hover:bg-red-800"
          onClick={removeBookmark}
        >
          Delete
        </button>
      )}
      <Link to={`/inspect?manga=${manga.mangaID}`}>
        <img
          src={manga.mangaImage}
          alt="popular_today_img"
          className="w-full md:h-[240px] 2xs:h-[300px] object-cover transition-transform duration-300 hover:brightness-75"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </Link>
      <div className="flex-grow">
        <div className="flex flex-col justify-between h-full">
          <Link
            to={`/inspect?manga=${manga.mangaTitle}`}
            className={`md:text-[14px] 2xs:text-[20px] mt-1 hover:text-primary ${
              hover ? "text-primary" : "text-white"
            } mb-1 line-clamp-2`}
          >
            {manga.mangaTitle}
          </Link>
          <div className="flex flex-col">
            <p className="text-dimWhite md:text-[12px] 2xs:text-[18px] mt-1">
              Chapter {manga.totalChapters}
            </p>
            <div className="flex">
              <StarRating rating={manga.rating} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
