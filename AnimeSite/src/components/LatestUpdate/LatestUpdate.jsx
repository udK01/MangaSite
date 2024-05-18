import { useMediaQuery } from "react-responsive";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import Separator from "../Separator";
import Card from "./Card";

import ComicsProvider from "../ComicsProvider";

export default function LatestUpdate() {
  const { comics } = useContext(ComicsProvider);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentComics = comics.slice(indexOfFirstItem, indexOfLastItem);

  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 });

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="w-full max-w-[825px] bg-quaternary p-2 rounded-sm text-white font-poppins">
      <div className="flex justify-between">
        <p className="ml-1 mt-1 md:text-[16px] 2xs:text-[20px]">
          Latest Update
        </p>
        <button className="bg-primary md:text-[8px] 2xs:text-[12px] px-2">
          <Link to={"/comics"}>VIEW ALL</Link>
        </button>
      </div>
      <Separator />
      <ul>
        {currentComics.map((manga, index) =>
          isDesktopOrLaptop ? (
            index % 2 === 0 && (
              <li key={manga.mangaID} className="flex flex-col">
                <div className="flex justify-between">
                  <Card manga={manga} />
                  {currentComics.length > index + 1 ? (
                    <Card manga={currentComics[index + 1]} />
                  ) : null}
                </div>
                {comics.length > index + 1 && <Separator />}
              </li>
            )
          ) : (
            <li key={manga.mangaID} className="flex flex-col">
              <div className="flex justify-between">
                <Card manga={manga} />
              </div>
              {comics.length > index + 1 && <Separator />}
            </li>
          )
        )}
      </ul>
      <div className="flex justify-center space-x-2 items-center">
        <button
          onClick={() => {
            paginate(currentPage - 1);
            isDesktopOrLaptop
              ? window.scrollTo(0, 878)
              : window.scrollTo(0, 1375);
          }}
          className={`px-6 py-1 mb-2 bg-primary ${
            currentPage === 1 && "hidden"
          }`}
        >
          &lt; Previous
        </button>
        <button
          onClick={() => {
            paginate(currentPage + 1);
            isDesktopOrLaptop
              ? window.scrollTo(0, 878)
              : window.scrollTo(0, 1375);
          }}
          className={`px-12 py-1 mb-2 bg-primary ${
            indexOfLastItem >= comics.length && "hidden"
          }`}
        >
          Next &gt;
        </button>
      </div>
    </section>
  );
}
