import { slides } from "../constants";
import { FaStar } from "react-icons/fa";

export default function PopularCard() {
  return (
    <li className="flex items-center justify-evenly w-full h-[120px]">
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
        <span class="flex flex-wrap text-[12px]">
          <b>Genres:</b>
          <a class="ml-1">Action</a>
          <span class="text-gray-500">,</span>
          <a class="ml-1">Fantasy</a>
          <span class="text-gray-500">,</span>
          <a class="ml-1">Supernatural</a>
          <span class="text-gray-500">,</span>
          <a class="ml-1">Mystery</a>
          <span class="text-gray-500">,</span>
        </span>
        <div className="flex items-center mt-1 text-yellow-400">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <p className="text-dimWhite ml-1">0.0</p>
        </div>
      </div>
    </li>
  );
}
