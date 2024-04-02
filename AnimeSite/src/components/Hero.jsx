import { useEffect, useState } from "react";
import LatestUpdate from "./LatestUpdate";
import PopularToday from "./PopularToday";
import Carousel from "./Carousel";
import Trending from "./Trending";
import Popular from "./Popular";
import axios from "axios";

export default function Hero() {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    axios
      .get(`api/mangas`)
      .then((response) => {
        setComics(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching mangas:`, error);
      });
  }, []);

  return (
    <section className="flex mt-16">
      <div id="body" className="flex flex-col">
        <div className="flex justify-between">
          <Carousel />
          <Trending comics={comics} />
        </div>
        <PopularToday comics={comics} />
        <LatestUpdate />
      </div>
      <div id="sidebar">
        <Popular />
      </div>
    </section>
  );
}
