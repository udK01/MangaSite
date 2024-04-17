import Chapter from "../InspectView/Chapter/Chapter";
import { Link } from "react-router-dom";

function sortChapters(chapters) {
  return chapters.sort((a, b) => b.chapterNumber - a.chapterNumber);
}

export default function Card({ manga }) {
  return (
    <div className="flex w-[403px] h-[172px] p-2">
      <Link
        to={`/${manga.mangaTitle.replace(/\s+/g, "-")}`}
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
          to={`/${manga.mangaTitle.replace(/\s+/g, "-")}`}
          className="ml-3 mt-1 hover:text-primary hover:cursor-pointer line-clamp-1 text-ellipsis"
        >
          {manga.mangaTitle}
        </Link>
        {sortChapters(manga.chapters)
          .slice(0, 3)
          .map((chapter) => (
            <Chapter
              key={chapter.chapterID}
              mangaTitle={manga.mangaTitle}
              chapter={chapter}
            />
          ))}
      </div>
    </div>
  );
}
