import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

import axios from "axios";

export default function InteractiveStarRating({ user, manga }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    axios
      .get("/api/rating", {
        params: {
          userID: user[0].userID,
          mangaID: manga.mangaID,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setRating(response.data[0].rating);
      })
      .catch((error) => {
        console.error(`Failed to fetch rating:`, error);
      });
  }, [rating]);

  function handleRating(currentRating) {
    axios
      .post("/api/rating", {
        userID: user[0].userID,
        mangaID: manga.mangaID,
        rating: currentRating,
      })
      .catch((error) => {
        console.error(`Failed to handle rating:`, error);
      });
  }

  return (
    <div
      className="w-[105px] flex justify-evenly py-[1px] pb-[2px] mt-1"
      onMouseLeave={() => setHover(null)}
    >
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label key={index} onMouseEnter={() => setHover(currentRating)}>
            <input
              type="radio"
              name="rating"
              value={currentRating}
              onClick={() => {
                setRating(currentRating);
                handleRating(currentRating);
              }}
              className="hidden"
            />
            <FaStar
              size={17}
              className={`hover:cursor-pointer ${
                (hover || rating) >= currentRating
                  ? "text-yellow-500"
                  : "text-gray-500"
              }`}
            />
          </label>
        );
      })}
    </div>
  );
}
