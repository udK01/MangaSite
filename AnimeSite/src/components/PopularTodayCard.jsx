import { slides } from "../constants";
import StarRating from "./StarRating";
import { FaStar } from "react-icons/fa";

export default function PopularTodayCard() {
  return (
    <div className="w-[147px] h-[260px] font-poppins rounded-md">
      <img
        src={slides[2].src}
        alt="popular_today_img"
        className="w-full h-[90%] mt-2"
      />
      <h4 className="text-white text-[16px] mt-1">Example Title</h4>
      <p className="text-dimWhite text-[12px] mt-1">Chapter 73</p>
      <StarRating rating={4.6} />
      {/* <div className="flex items-center text-yellow-400">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <p className="text-dimWhite ml-1.5">0.0</p>
      </div> */}
    </div>
  );
}
