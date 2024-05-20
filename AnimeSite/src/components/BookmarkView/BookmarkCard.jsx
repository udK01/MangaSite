import { useState } from "react";
import { Link } from "react-router-dom";

import StarRating from "../StarRating";

export default function BookmarkCard({ manga }) {
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <div className="w-full md:max-w-[142px] 2xs:max-w-[187px] h-full font-poppins rounded-md overflow-hidden flex flex-col ml-5 pb-5">
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
