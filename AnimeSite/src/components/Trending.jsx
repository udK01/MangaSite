import { Link } from "react-router-dom";
import { useContext } from "react";

import ComicsProvider from "./ComicsProvider";

export default function Trending() {
  const { comics } = useContext(ComicsProvider);

  return (
    <div className="relative w-auto max-w-[200px] h-[280px] ml-3">
      <div className="absolute flex justify-center items-center w-full h-8 bg-primary shadow-2xl shadow-red-600 z-10">
        <h2 className="font-bold tracking-widest text-white font-poppins">
          &lt; Trending &gt;
        </h2>
      </div>
      {comics.length > 0 ? (
        <Link
          to={`/inspect?manga=${comics[3].mangaID}`}
          className="hover:cursor-pointer"
        >
          <img
            src={comics[3].mangaImage}
            className="w-full h-full brightness-75 z-0"
            alt="Trending"
          />
        </Link>
      ) : null}
    </div>
  );
}
