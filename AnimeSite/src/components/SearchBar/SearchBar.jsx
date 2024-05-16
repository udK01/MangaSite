import { useContext, useEffect, useState } from "react";

import ComicsContext from "../ComicsProvider";
import SearchCard from "./SearchCard";

export default function SearchBar() {
  const [search, setSearch] = useState("Search");
  const [searchedComics, setSearchedComics] = useState([]);
  const [displayResults, setDisplayResults] = useState(false);
  const { comics } = useContext(ComicsContext);

  useEffect(() => {
    setSearchedComics(
      comics.filter((comic) =>
        comic.mangaTitle
          .trim()
          .toLowerCase()
          .includes(search.trim().toLowerCase())
      )
    );
  }, [search]);

  function displaySearch() {
    return (
      searchedComics.length > 0 && search.length > 0 && search !== "Search"
    );
  }

  return (
    <>
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={(e) => {
            setDisplayResults(true);
            if (e.target.value === "Search") {
              setSearch("");
            }
          }}
          onBlur={(e) => {
            setDisplayResults(false);
            if (e.target.value === "") {
              setSearch("Search");
            }
          }}
          className={`w-[300px] h-[34px] px-4 rounded-sm border-2 border-quaternary bg-secondary text-white`}
        />
        {displaySearch() && (
          <div
            className={`scrollbar-thumb-primary scrollbar-track-transparent ${
              !displayResults && "hidden"
            }`}
          >
            <div
              className={`absolute w-[300px] h-[auto] max-h-[310px] border-2 border-primary bg-secondary overflow-y-auto scrollbar-thin`}
            >
              {searchedComics.map((comic) => (
                <SearchCard key={comic.mangaID} comic={comic} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
