import { useState } from "react";

import Separator from "../Separator";
import Card from "../PopularToday/PopularTodayCard";

export default function Comics({ comics }) {
  const [mangas, setMangas] = useState(comics);

  const buttonFormatting =
    "ml-[17px] flex justify-center w-[150px] bg-quinary rounded-md";

  return (
    <section className="w-[854px] h-auto bg-quaternary rounded-sm font-poppins">
      <div className="flex justify-between my-4 mx-4 text-white">
        Manga Lists
      </div>
      <Separator />
      <div className="flex text-white mb-3">
        <div className={buttonFormatting}>Genre All</div>
        <div className={buttonFormatting}>Status All</div>
        <div className={buttonFormatting}>Type All</div>
        <div className={buttonFormatting}>Order by Update</div>
        <div className={buttonFormatting}>🔍 Search</div>
      </div>
      <div className="flex flex-wrap justify-evenly pb-6">
        {mangas.map((manga, index) => (
          <div key={index} className="flex mt-2">
            <Card manga={manga} />
          </div>
        ))}
      </div>
    </section>
  );
}
