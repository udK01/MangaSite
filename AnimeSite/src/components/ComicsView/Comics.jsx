import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Separator from "../Separator";
import ComicDropdown from "./ComicDropdown";
import Card from "../PopularToday/PopularTodayCard";

export default function Comics({ comics }) {
  const [mangas, setMangas] = useState(comics);
  const [filteredMangas, setFilteredMangas] = useState(mangas);

  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const [selectedStatus, setSelectedStatus] = useState("Status");
  const [selectedType, setSelectedType] = useState("Type");
  const [selectedOrder, setSelectedOrder] = useState("Order By");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/getGenres")
      .then((response) => setGenres(response.data[0]))
      .catch((error) => console.error(`Failed to fetch genres:`, error));
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const genre = searchParams.get("genre");
    setSelectedGenres(genre ? [genre] : []);
  }, [location.search]);

  // Filter according to genres.
  useEffect(() => {
    if (!Array.isArray(selectedGenres)) return;

    let filteredArr = mangas.filter((manga) =>
      selectedGenres.every((genre) => manga.genres.includes(genre))
    );

    // Filter by status
    if (defaultValue(selectedStatus, "Status")) {
      filteredArr = filteredArr.filter(
        (manga) => manga.status === selectedStatus
      );
    }

    // Filter by type
    if (defaultValue(selectedType, "Type")) {
      filteredArr = filteredArr.filter((manga) => manga.type === selectedType);
    }

    if (defaultValue(selectedOrder, "Order By")) {
      switch (selectedOrder) {
        case "A-Z":
          filteredArr = filteredArr.sort((a, b) =>
            a.mangaTitle.localeCompare(b.mangaTitle)
          );
          break;
        case "Z-A":
          filteredArr = filteredArr.sort((a, b) =>
            b.mangaTitle.localeCompare(a.mangaTitle)
          );
          break;
        case "Update":
          filteredArr = filteredArr.sort((a, b) => {
            if (a.chapters.length > 0 && b.chapters.length > 0) {
              return a.chapters[0].uploadDate - b.chapters[0].uploadDate;
            } else if (a.chapters.length === 0 && b.chapters.length === 0) {
              return 0;
            } else if (a.chapters.length === 0) {
              return 1;
            } else {
              return -1;
            }
          });
          break;
        case "Added":
          filteredArr = filteredArr.sort(
            (a, b) => new Date(a.postedOn) - new Date(b.postedOn)
          );
          break;
      }
    }

    setFilteredMangas(filteredArr);
  }, [selectedGenres, selectedStatus, selectedType, selectedOrder]);

  function defaultValue(x, y) {
    return x !== y && x !== "All";
  }

  function resetValues() {
    setSelectedGenres([]);
    setSelectedStatus("Status");
    setSelectedType("Type");
    setSelectedOrder("Order By");
    navigate("/comics");
  }

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
          genresSelected={selectedGenres}
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
        <div
          className={`ml-[17px] flex justify-center w-[150px] rounded-sm bg-primary hover:bg-purple-700 hover:cursor-pointer`}
          onClick={() => resetValues()}
        >
          Reset
        </div>
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
