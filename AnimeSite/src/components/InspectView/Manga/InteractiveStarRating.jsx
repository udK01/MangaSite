import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function InteractiveStarRating({ manga }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div className="w-[105px] flex justify-evenly py-[1px] mt-1">
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={currentRating}
              onClick={() => setRating(currentRating)}
              className="hidden"
            />
            <FaStar
              size={17}
              className={`hover:cursor-pointer ${
                (hover || rating) >= currentRating
                  ? "text-yellow-500"
                  : "text-gray-500"
              }`}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
}
