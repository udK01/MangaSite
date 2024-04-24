import { useState, useEffect } from "react";
import axios from "axios";

import Card from "../../PopularToday/PopularTodayCard";
import Separator from "../../Separator";

export default function RelatedSeries({ manga }) {
  const [mangas, setMangas] = useState([]);

  useEffect(() => {
    axios
      .get("/api/relatedSeries", {
        params: {
          genres: manga.genres,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setMangas(response.data.filter((m) => m.mangaID !== manga.mangaID));
      })
      .catch((error) => {
        console.error("Error fetching related series:", error);
      });
  }, []);

  return (
    <section className="w-full h-auto bg-quaternary mt-5 p-3 rounded-md">
      <div className="font-poppins text-white">Related Series</div>
      <Separator />
      <div className="flex w-auto justify-evenly">
        {mangas.slice(0, 7).map((m, index) => (
          <div key={index} className={`flex ${index !== 0 ? "ml-4" : ""}`}>
            <Card manga={m} />
          </div>
        ))}
      </div>
    </section>
  );
}
