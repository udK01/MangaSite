import { useState, useEffect } from "react";
import axios from "axios";

import Separator from "../Separator";
import ComicDropdown from "./ComicDropdown";
import Card from "../PopularToday/PopularTodayCard";
import { FaChessBishop } from "react-icons/fa";

export default function Comics({ comics }) {
  const [mangas, setMangas] = useState(comics);
  const [filteredMangas, setFilteredMangas] = useState(mangas);

  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const [selectedStatus, setSelectedStatus] = useState("Status");
  const [selectedType, setSelectedType] = useState("Type");
  const [selectedOrder, setSelectedOrder] = useState("Order By");

  useEffect(() => {
    axios
      .get("/api/getGenres")
      .then((response) => setGenres(response.data[0]))
      .catch((error) => console.error(`Failed to fetch genres:`, error));
  }, []);

  // Filter according to genres.
  useEffect(() => {
    if (!Array.isArray(selectedGenres)) return;
    setFilteredMangas(
      mangas.filter((manga) =>
        selectedGenres.every((genre) => manga.genres.includes(genre))
      )
    );
  }, [selectedGenres]);

  useEffect(() => {
    console.log(selectedStatus);
  }, [selectedStatus]);

  useEffect(() => {
    console.log(selectedType);
  }, [selectedType]);

  useEffect(() => {
    console.log(selectedOrder);
  }, [selectedOrder]);

  const buttonFormatting =
    "ml-[17px] flex justify-center w-[150px] bg-quinary rounded-sm";

  return (
    <section className="w-[854px] h-auto bg-quaternary rounded-sm font-poppins">
      <div className="flex justify-between my-4 mx-4 text-white">
        Manga Lists
      </div>
      <Separator />
      <div className="flex text-white mb-3">
        <ComicDropdown
          options={genres.map((genre) => genre.genreTag)}
          value={"Genre"}
          func={setSelectedGenres}
          multiOptional={true}
        />
        <ComicDropdown
          options={[
            "All",
            "OnGoing",
            "Completed",
            "Hiatus",
            "Dropped",
            "Coming Soon",
          ]}
          value={selectedStatus}
          func={setSelectedStatus}
          className={"-translate-x-[166px]"}
        />
        <ComicDropdown
          options={["All", "Manga", "Manhwa", "Manhua", "Comic", "Novel"]}
          value={selectedType}
          func={setSelectedType}
          className={"-translate-x-[335px]"}
        />
        <ComicDropdown
          options={["Default", "A-Z", "Z-A", "Update", "Added", "Popular"]}
          value={selectedOrder}
          func={setSelectedOrder}
          className={"-translate-x-[500px]"}
        />
        <div className={buttonFormatting}>🔍 Search</div>
      </div>
      <div className="flex flex-wrap pb-6">
        {filteredMangas.length > 0 ? (
          filteredMangas.map((manga, index) => (
            <div key={index} className="flex mt-2 ml-5">
              <Card manga={manga} />
            </div>
          ))
        ) : (
          <h2 className="w-full flex justify-center text-white font-poppins text-[32px] mt-5">
            There are no comics found.
          </h2>
        )}
      </div>
    </section>
  );
}
