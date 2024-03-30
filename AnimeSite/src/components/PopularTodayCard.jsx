import { useState } from "react";
import { slides } from "../constants";
import StarRating from "./StarRating";

export default function PopularTodayCard() {
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <div className="w-[147px] font-poppins rounded-md overflow-hidden">
      <img
        src={slides[2].src}
        alt="popular_today_img"
        className="w-full h-[240px] object-cover transition-transform duration-300 hover:brightness-75"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <div>
        <h4
          className={`text-white text-[16px] mt-1 hover:text-primary ${
            hover ? "text-primary" : ""
          }`}
        >
          Example Title
        </h4>
        <p className="text-dimWhite text-[12px] mt-1">Chapter 73</p>
        <StarRating rating={(Math.random() * 4 + 1).toFixed(2)} />
      </div>
    </div>
  );
}
