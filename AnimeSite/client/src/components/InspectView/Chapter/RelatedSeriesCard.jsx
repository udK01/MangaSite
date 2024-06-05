import { Link } from "react-router-dom";
import { useState } from "react";

import StarRating from "../../StarRating";

export default function RelatedSeriesCard({ manga }) {
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <div className="xl:w-[145px] lg:w-[185px] md:[165px] 2xs:w-[200px] m-2 font-poppins rounded-md overflow-hidden flex flex-col">
      <Link to={`/inspect?manga=${manga.mangaID}`}>
        <img
          src={manga.mangaImage}
          alt="popular_today_img"
          className="w-full h-auto min-h-[275px] object-cover transition-transform duration-300 hover:brightness-75"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </Link>
      <div className="flex-grow">
        <div className="flex flex-col justify-between h-full">
          <Link
            to={`/inspect?manga=${manga.mangaID}`}
            className={`md:text-[14px] 2xs:text-[18px] mt-1 hover:text-primary ${
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
