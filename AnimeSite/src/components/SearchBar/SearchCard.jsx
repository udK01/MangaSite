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
        <div className="flex justify-center line-clamp-2">
          {comic.mangaTitle}
        </div>
        <StarRating rating={comic.rating} />
      </div>
    </Link>
  );
}
