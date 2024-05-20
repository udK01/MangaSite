import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";

import Separator from "../Separator";
import ComicDropdown from "./ComicDropdown";
import Card from "./ComicCard";

import ComicsProvider from "../ComicsProvider";

export default function Comics() {
  const { comics } = useContext(ComicsProvider);
  const [filteredMangas, setFilteredMangas] = useState(comics);

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

    let filteredArr = comics.filter((manga) =>
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
    <section className="w-full md:max-w-[705px] lg:max-w-[825px] mb-10 h-auto bg-quaternary rounded-sm font-poppins">
      <div className="flex justify-between my-4 mx-4 text-white">
        Manga Lists
      </div>
      <Separator />
      {/* Button Container */}
      <div className="flex 2xs:flex-col xl:flex-row  text-white">
        <div className="flex md:flex-row 2xs:flex-col 2xs:space-y-3 md:space-y-0 mb-2 px-4 w-full">
          {/* Genres and Status */}
          <ComicDropdown
            options={genres.map((genre) => genre.genreTag)}
            value={"Genre"}
            func={setSelectedGenres}
            multiOptional={true}
            genresSelected={selectedGenres}
            className={"md:-translate-x-[15px]"}
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
            className={"md:-translate-x-[177px]"}
          />
          {/* Type and Sort */}
          <ComicDropdown
            options={["All", "Manga", "Manhwa", "Manhua", "Comic", "Novel"]}
            value={selectedType}
            func={setSelectedType}
            className={"md:-translate-x-[340px]"}
          />
          <ComicDropdown
            options={["Default", "A-Z", "Z-A", "Update", "Added", "Popular"]}
            value={selectedOrder}
            func={setSelectedOrder}
            className={"md:-translate-x-[505px]"}
          />
          {/* Reset */}
          <div
            className={`text-[16px] flex justify-center 2xs:w-full md:w-[120px] lg:w-[145px] rounded-sm bg-primary hover:bg-purple-700 hover:cursor-pointer`}
            onClick={() => resetValues()}
          >
            Reset
          </div>
        </div>
      </div>
      <div className="flex flex-wrap pb-6">
        {filteredMangas.length > 0 ? (
          filteredMangas.map((manga, index) => (
            <div
              key={index}
              className="2xs:w-1/2 md:w-auto flex mt-2 md:ml-[18px] 2xs:ml-0"
            >
              <Card manga={manga} />
            </div>
          ))
        ) : (
          <>
            <Separator />
            <h2 className="w-full flex justify-center text-white font-poppins md:text-[32px] 2xs:text-[24px] my-6">
              There are no comics found.
            </h2>
          </>
        )}
      </div>
    </section>
  );
}
