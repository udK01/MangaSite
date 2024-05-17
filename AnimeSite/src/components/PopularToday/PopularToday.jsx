import PopularTodayCard from "./PopularTodayCard";
import Separator from "../Separator";
import { useContext } from "react";

import ComicsProvider from "../ComicsProvider";

export default function PopularToday() {
  const { comics } = useContext(ComicsProvider);

  return (
    <section className="w-full h-auto mb-10">
      <div className="w-auto md:max-w-[832px] 2xs:max-w-[1100px] h-auto flex flex-col mx-auto bg-quaternary p-2 rounded-sm mt-10">
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
