import React, { useState, useEffect, useContext } from "react";
import { slides, slide_timer } from "../constants";
import { Link } from "react-router-dom";

import StarRating from "./StarRating";
import ComicsProvider from "./ComicsProvider";

export default function Carousel() {
  const { comics } = useContext(ComicsProvider);
  let [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, slide_timer);

    return () => clearTimeout(timer);
  }, [current]);

  const nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  return (
    <div className="w-auto h-full md:max-w-[620px] 2xs:max-w-[1100px]">
      <div className="md:h-[280px] 2xs:h-[400px] overflow-hidden relative">
        <div
          className={`flex transition ease-out duration-40`}
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {comics.slice(0, 5).map((manga) => {
            return (
              <img
                key={manga.mangaID}
                src={manga.mangaImage}
                alt="carousel-img"
                className="h-full w-full object-cover blur-md brightness-50 mix-blend-darken"
                style={{ minWidth: "100%", minHeight: "100%" }}
              />
            );
          })}
          <div className="flex justify-evenly md:w-[3100px] 2xs:w-[5500px] h-full absolute font-poppins">
            {comics.slice(0, 5).map((manga) => (
              <div
                key={manga.mangaID}
                className="flex items-center justify-center w-full m-10"
              >
                <div className="flex flex-col w-full h-full">
                  {/* Title and Type */}
                  <div className="flex flex-col justify-center text-white">
                    <Link
                      to={`/inspect?manga=${manga.mangaID}`}
                      className="tracking-wide md:text-[24px] 2xs:text-[48px] line-clamp-1 hover:text-yellow-400 hover:cursor-pointer transition-all duration-300"
                    >
                      {manga.mangaTitle}
                    </Link>
                    <h2 className="md:text-[20px] 2xs:text-[40px] text-yellow-400">
                      {manga.type}
                    </h2>
                  </div>
                  {/* Genres */}
                  <div className="flex md:w-[250px] 2xs:w-[500px]">
                    <p className="md:text-[14px] 2xs:text-[30px] text-dimWhite overflow-hidden whitespace-nowrap overflow-ellipsis">
                      {manga.genres.map((genre, i) => (
                        <React.Fragment key={i}>
                          {i !== 0 && <span className="mr-1">,</span>}
                          <span className="hover:text-primary hover:cursor-pointer">
                            {genre}
                          </span>
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                  {/* Summary */}
                  <h2 className="text-white font-semibold mt-3 md:text-[14px] 2xs:text-[20px]">
                    SUMMARY
                  </h2>
                  <span className="text-dimWhite line-clamp-1 text-ellipsis md:text-[14px] 2xs:text-[20px]">
                    {manga.description}
                  </span>
                  <div className="flex flex-col text-dimWhite mt-2 md:text-[14px] 2xs:text-[20px]">
                    {/* Status */}
                    <div>Status: {manga.status}</div>
                    {/* Author */}
                    <div>Author: {manga.author}</div>
                  </div>
                </div>
                <div className="flex flex-col h-full">
                  <Link to={`/inspect?manga=${manga.mangaID}`}>
                    <img
                      src={manga.mangaImage}
                      alt="manga-img"
                      className="md:w-[140px] 2xs:w-[250px] h-full hover:cursor-pointer"
                    />
                  </Link>
                  <StarRating rating={manga.rating} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
          {slides.map((s, index) => (
            <div
              key={"circle" + index}
              className={`rounded-full w-3 h-3 ${
                index === current ? "bg-yellow-400" : "bg-gray-400"
              } `}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
