import React, { useState, useEffect } from "react";
import Chapter from "../InspectView/Chapter/Chapter";
import { Link } from "react-router-dom";

function sortChapters(chapters) {
  return chapters.sort((a, b) => b.chapterNumber - a.chapterNumber);
}

export default function Card({ manga }) {
  return (
    <div className="flex w-full max-w-[405px] h-auto p-2">
      <Link
        to={`/inspect?manga=${manga.mangaID}`}
        className="hover:cursor-pointer"
      >
        <img
          src={manga.mangaImage}
          alt="manga-img"
          className="w-[150px] h-full hover:cursor-pointer"
        />
      </Link>
      <div className="flex flex-col w-full">
        <Link
          to={`/inspect?manga=${manga.mangaID}`}
          className="ml-3 mt-1 hover:text-primary hover:cursor-pointer line-clamp-1 md:text-[16px] 2xs:text-[20px]"
        >
          {manga.mangaTitle}
        </Link>
        {sortChapters(manga.chapters)
          .slice(0, 3)
          .map((chapter) => (
            <Chapter key={chapter.chapterID} manga={manga} chapter={chapter} />
          ))}
      </div>
    </div>
  );
}
