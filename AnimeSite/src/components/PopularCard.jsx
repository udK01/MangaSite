import { slides } from "../constants";
import StarRating from "./StarRating";

export default function PopularCard() {
  return (
    <div className="flex items-center justify-evenly w-full h-[120px]">
      <div className="h-[30%] flex items-center border border-solid border-gray-500 px-2 ml-2 rounded-md text-gray-500">
        1
      </div>
      <img
        src={slides[3].src}
        alt="manga-img"
        className="w-[60px] h-[100px] object-fit m-2"
      />
      <div className="flex flex-col">
        <h2 className="font-poppins hover:text-primary">Example Title</h2>
        <span className="flex flex-wrap text-[12px]">
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
        <StarRating rating={(Math.random() * 4 + 1).toFixed(2)} />
      </div>
    </div>
  );
}
