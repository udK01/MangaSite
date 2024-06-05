import { Link } from "react-router-dom";
import StarRating from "../StarRating";
import React from "react";

export default function PopularCard({ manga, index }) {
  return (
    <div className="flex w-full h-auto">
      <div className="flex items-center h-auto mx-2">
        <div className="size-[40px] flex flex-shrink-0 justify-center items-center border border-gray-500 rounded-md text-dimWhite">
          {index + 1}
        </div>
      </div>
      <Link
        to={`/inspect?manga=${manga.mangaID}`}
        className="w-[60px] h-[100px] object-fit m-2 hover:cursor-pointer flex-shrink-0 flex-grow-0"
      >
        <img src={manga.mangaImage} alt="manga-img" className="w-full h-full" />
      </Link>

      <div className="flex flex-col mt-2">
        <Link
          to={`/inspect?manga=${manga.mangaID}`}
          className="font-poppins hover:text-primary hover:cursor-pointer line-clamp-2 text-[16px]"
        >
          {manga.mangaTitle}
        </Link>
        <span className="flex flex-wrap text-[12px] text-dimWhite line-clamp-2 text-ellipsis h-[40px]">
          <b>Genres:</b>
          {manga.genres.map((genre, i) => (
            <div key={i}>
              <Link
                to={`/comics?genre=${genre}`}
                className="ml-1 hover:text-primary hover:cursor-pointer"
              >
                {genre}
              </Link>
              {i !== manga.genres.length - 1 && (
                <span className="text-gray-500">,</span>
              )}
            </div>
          ))}
        </span>
        <div className="flex">
          <StarRating rating={manga.rating} size={25} />
        </div>
      </div>
    </div>
  );
}
