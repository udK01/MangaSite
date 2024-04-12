import { Link } from "react-router-dom";
import StarRating from "../StarRating";
import { useState } from "react";

export default function PopularTodayCard({ manga }) {
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <div className="w-[147px] font-poppins rounded-md overflow-hidden flex flex-col">
      <Link to={`/${manga.mangaTitle.replace(/\s+/g, "-")}`}>
        {" "}
        <img
          src={manga.mangaImage}
          alt="popular_today_img"
          className="w-full h-[240px] object-cover transition-transform duration-300 hover:brightness-75"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </Link>
      <div className="flex-grow">
        <div className="flex flex-col justify-between h-full">
          <Link
            to={`/${manga.mangaTitle.replace(/\s+/g, "-")}`}
            className={`text-[14px] mt-1 hover:text-primary ${
              hover ? "text-primary" : "text-white"
            } mb-1 line-clamp-2`}
          >
            {manga.mangaTitle}
          </Link>
          <div className="flex flex-col">
            <p className="text-dimWhite text-[12px] mt-1">
              Chapter {manga.totalChapters}
            </p>
            <StarRating rating={manga.rating} />
          </div>
        </div>
      </div>
    </div>
  );
}
