import StarRating from "../StarRating";

export default function SearchCard({ comic }) {
  return (
    <div className="flex">
      <img
        src={`${comic.mangaImage}`}
        alt="manga.img"
        className="w-1/3 md:h-auto 2xs:h-[90%] my-2 mx-2 border-2 border-primary"
      />
      <div className="mt-3">
        <div className="flex line-clamp-2 md:text-[16px] 2xs:text-[14px]">
          {comic.mangaTitle}
        </div>
        <div className="md:line-clamp-3 2xs:line-clamp-2 text-dimWhite text-[12px]">
          {comic.description}
        </div>
        <div className="flex">
          <StarRating rating={comic.rating} size={20} />
        </div>
      </div>
    </div>
  );
}
