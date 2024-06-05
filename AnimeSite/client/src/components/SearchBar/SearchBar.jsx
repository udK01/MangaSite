import { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";

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
            if (e.target.value === "") {
              setSearch("Search");
            }
          }}
          className={`md:w-[300px] 2xs:w-[200px] h-[34px] px-4 rounded-sm border-2 md:border-primary 2xs:border-quaternary bg-secondary text-white`}
        />
        {displaySearch() && (
          <div
            className={`scrollbar-thumb-primary scrollbar-track-transparent ${
              !displayResults && "hidden"
            }`}
          >
            <div
              className={`absolute w-[300px] 2xs:-translate-x-10 md:-translate-x-0 max-h-[310px] border-2 border-primary bg-secondary overflow-y-auto scrollbar-thin z-20`}
            >
              {searchedComics.map((comic) => (
                <Link
                  key={comic.mangaID}
                  to={`/inspect?manga=${comic.mangaID}`}
                  onClick={() => setSearch("")}
                >
                  <SearchCard comic={comic} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
