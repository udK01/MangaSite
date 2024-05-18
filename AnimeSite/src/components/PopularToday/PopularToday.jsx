import PopularTodayCard from "./PopularTodayCard";
import Separator from "../Separator";
import { useContext, useEffect, useState } from "react";

import ComicsProvider from "../ComicsProvider";

export default function PopularToday() {
  const { comics } = useContext(ComicsProvider);
  const [cardCount, setCardCount] = useState(5);

  useEffect(() => {
    const updateSliceCount = () => {
      if (window.outerWidth <= 767) {
        setCardCount(2);
      } else {
        setCardCount(5);
      }
    };

    updateSliceCount();

    window.addEventListener("resize", updateSliceCount);

    return () => window.removeEventListener("resize", updateSliceCount);
  }, []);

  return (
    <section className="w-full md:max-w-[832px] h-auto my-10">
      <div className="flex flex-col bg-quaternary p-2 rounded-sm">
        <p className="font-poppins text-white ml-1 mt-1 md:text-[16px] 2xs:text-[20px]">
          Popular Today
        </p>
        <Separator />
        <div className="w-full flex 2xs:flex-col md:flex-row justify-evenly">
          {comics.slice(0, cardCount).map((manga, index) => (
            <div key={manga.mangaID} className="flex">
              <PopularTodayCard manga={manga} />
              {cardCount === 2 && (
                <PopularTodayCard manga={comics[index + 2]} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
