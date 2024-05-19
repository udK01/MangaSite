import { useState, useEffect, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import axios from "axios";

import Card from "./RelatedSeriesCard";
import Separator from "../../Separator";
import ComicsContext from "../../ComicsProvider";

export default function RelatedSeries() {
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 });
  const { comics } = useContext(ComicsContext);
  const [mangas, setMangas] = useState([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const mID = parseInt(searchParams.get("manga"), 10);

    const foundManga = comics.find((comic) => comic.mangaID === mID);

    axios
      .get("/api/relatedSeries", {
        params: {
          genres: foundManga.genres,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setMangas(
          response.data.filter((m) => m.mangaID !== foundManga.mangaID)
        );
      })
      .catch((error) => {
        console.error("Error fetching related series:", error);
      });
  }, []);

  return (
    <section className="w-full h-auto bg-quaternary mt-5 p-3 rounded-md">
      <div className="font-poppins text-white">Related Series</div>
      <Separator />
      {/* <div className="flex flex-wrap 2xs:flex-nowrap 2xs:justify-center md:flex-col md:justify-evenly w-full"></div> */}
      <div className="flex xl:flex-nowrap 2xs:flex-wrap 2xs:justify-center md:justify-evenly w-full">
        {mangas.slice(0, 7).map((m, index) => (
          <div
            key={index}
            className="flex xl:w-full lg:w-1/4 md:w-1/3 2xs:w-1/2 justify-center"
          >
            <Card manga={m} />
          </div>
        ))}
      </div>
    </section>
  );
}
