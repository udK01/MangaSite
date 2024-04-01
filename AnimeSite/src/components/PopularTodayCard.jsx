import { useState } from "react";
import { slides } from "../constants";
import StarRating from "./StarRating";

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
      <img
        src={slides[2].src}
        alt="popular_today_img"
        className="w-full h-[240px] object-cover transition-transform duration-300 hover:brightness-75"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <div className="flex-grow">
        <div className="flex flex-col justify-evenly h-full">
          <h4
            className={`text-white text-[14px] mt-1 hover:text-primary ${
              hover ? "text-primary" : ""
            } mb-1`}
          >
            {manga.mangaTitle}
          </h4>
          <p className="text-dimWhite text-[12px] mt-1">
            Chapter {manga.totalChapters}
          </p>
          <StarRating rating={manga.rating} />
        </div>
      </div>
    </div>
  );
}
