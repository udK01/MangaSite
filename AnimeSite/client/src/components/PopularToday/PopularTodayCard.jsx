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
    <div className="md:w-[145px] 2xs:w-full m-2 font-poppins rounded-md overflow-hidden flex flex-col">
      <Link to={`/inspect?manga=${manga.mangaID}`}>
        <img
          src={manga.mangaImage}
          alt="popular_today_img"
          className="w-full h-auto object-cover transition-transform duration-300 hover:brightness-75"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </Link>
      <div className="flex-grow">
        <div className="flex flex-col justify-between h-full">
          <Link
            to={`/inspect?manga=${manga.mangaID}`}
            className={`md:text-[14px] 2xs:text-[20px] mt-1 hover:text-primary ${
              hover ? "text-primary" : "text-white"
            } mb-1 line-clamp-2`}
          >
            {manga.mangaTitle}
          </Link>
          <div className="flex flex-col">
            <p className="text-dimWhite md:text-[12px] 2xs:text-[16px] mt-1">
              Chapter {manga.totalChapters}
            </p>
            <div className="flex">
              <StarRating rating={manga.rating} size={25} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
