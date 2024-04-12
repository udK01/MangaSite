import { Link } from "react-router-dom";
import StarRating from "../StarRating";

export default function PopularCard({ manga, index }) {
  return (
    <div className="flex items-center justify-evenly w-full h-[120px]">
      <div className="h-[30%] flex items-center border border-solid border-gray-500 px-2 ml-2 rounded-md text-gray-500">
        {index + 1}
      </div>
      <Link
        to={`/${manga.mangaTitle.replace(/\s+/g, "-")}`}
        className="w-[60px] h-[100px] object-fit m-2 hover:cursor-pointer flex-shrink-0 flex-grow-0"
      >
        <img src={manga.mangaImage} alt="manga-img" className="w-full h-full" />
      </Link>

      <div className="flex flex-col">
        <Link
          to={`/${manga.mangaTitle.replace(/\s+/g, "-")}`}
          className="font-poppins hover:text-primary hover:cursor-pointer line-clamp-2"
        >
          {manga.mangaTitle}
        </Link>
        <span className="flex flex-wrap text-[12px] line-clamp-2 text-ellipsis h-[40px]">
          <b>Genres:</b>
          {manga.genres.map((genre, i) => (
            <div key={i}>
              <a className="ml-1 hover:text-primary hover:cursor-pointer">
                {genre}
              </a>
              {i !== manga.genres.length - 1 ? (
                <span className="text-gray-500">,</span>
              ) : null}
            </div>
          ))}
        </span>
        <StarRating rating={manga.rating} />
      </div>
    </div>
  );
}
