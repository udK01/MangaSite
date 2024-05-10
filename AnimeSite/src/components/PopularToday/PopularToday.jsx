import PopularTodayCard from "./PopularTodayCard";
import Separator from "../Separator";
import { useContext } from "react";

import ComicsProvider from "../ComicsProvider";

export default function PopularToday() {
  const { comics } = useContext(ComicsProvider);

  return (
    <section className="h-[450px]">
      <div className="w-[832px] h-[410px] flex flex-col bg-quaternary p-2 rounded-sm mt-10">
        <p className="font-poppins text-white ml-1 mt-1">Popular Today</p>
        <Separator />
        <div className="flex w-full justify-evenly">
          {comics &&
            comics
              .slice(0, 5)
              .map((manga) => (
                <PopularTodayCard key={manga.mangaID} manga={manga} />
              ))}
        </div>
      </div>
    </section>
  );
}
