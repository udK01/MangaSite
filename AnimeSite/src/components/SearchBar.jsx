import { useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("Search");

  return (
    <>
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={(e) => {
            if (e.target.value === "Search") {
              setSearch("");
            }
          }}
          onBlur={(e) => {
            if (e.target.value === "") {
              setSearch("Search");
            }
          }}
          className="w-[350px] h-[34px] px-4 rounded-sm border-2 border-quaternary bg-secondary text-white"
        />
      </div>
    </>
  );
}
