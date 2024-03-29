import { slides } from "../constants";
import StarRating from "./StarRating";

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
      <StarRating rating={(Math.random() * 4 + 1).toFixed(2)} />
    </div>
  );
}
