import { slides } from "../constants";
import { FaStar } from "react-icons/fa";

export default function PopularCard() {
  return (
    <li className="flex items-center justify-evenly w-full h-[120px]">
      <div className="h-[30%] flex items-center border border-solid border-gray-500 p-3 ml-4 rounded-md text-gray-500">
        1
      </div>
      <img
        src={slides[0].src}
        alt="manga-img"
        className="w-[60px] h-[100px] object-fit m-2"
      />
      <div className="flex flex-col">
        <h4 className="font-poppins">Example Title</h4>
        <div className="flex text-wrap">
          <p className="text-dimWhite">
            Genres: Genre, Genre, Genre, Genre, Genre,...
          </p>
        </div>
        <div className="flex items-center mt-1 text-yellow-400">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <p className="text-dimWhite ml-3">0.0</p>
        </div>
      </div>
    </li>
  );
}
