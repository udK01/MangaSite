import StarRating from "./StarRating";

export default function PopularCard({ manga, index }) {
  return (
    <div className="flex items-center justify-evenly w-full h-[120px]">
      <div className="h-[30%] flex items-center border border-solid border-gray-500 px-2 ml-2 rounded-md text-gray-500">
        {index + 1}
      </div>
      <img
        src={manga.mangaImage}
        alt="manga-img"
        className="w-[60px] h-[100px] object-fit m-2"
      />
      <div className="flex flex-col">
        <h2 className="font-poppins hover:text-primary line-clamp-2">
          {manga.mangaTitle}
        </h2>
        <span className="flex flex-wrap text-[12px] line-clamp-2">
          <b>Genres:</b>
          <a className="ml-1">Action</a>
          <span className="text-gray-500">,</span>
          <a className="ml-1">Fantasy</a>
          <span className="text-gray-500">,</span>
          <a className="ml-1">Supernatural</a>
          <span className="text-gray-500">,</span>
          <a className="ml-1">Mystery</a>
          <span className="text-gray-500">,</span>
        </span>
        <StarRating rating={manga.rating} />
      </div>
    </div>
  );
}
