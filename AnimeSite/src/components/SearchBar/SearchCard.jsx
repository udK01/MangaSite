import { Link } from "react-router-dom";

import StarRating from "../StarRating";

export default function SearchCard({ comic }) {
  return (
    <Link className="flex" to={`/inspect?manga=${comic.mangaID}`}>
      <img
        src={`${comic.mangaImage}`}
        alt="manga.img"
        className="w-1/3 h-[auto] my-2 mx-2 border-2 border-primary"
      />
      <div className="mt-3">
        <div className="flex line-clamp-2">{comic.mangaTitle}</div>
        <div className="line-clamp-3 text-dimWhite text-[12px]">
          {comic.description}
        </div>
        <div className="flex">
          <StarRating rating={comic.rating} size={20} />
        </div>
      </div>
    </Link>
  );
}
