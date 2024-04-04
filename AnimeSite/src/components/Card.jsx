import Chapter from "./Chapter";
import { Link } from "react-router-dom";

function sortChapters(chapters) {
  return chapters.sort((a, b) => b.chapterNumber - a.chapterNumber);
}

export default function Card({ manga }) {
  return (
    <div className="flex w-[403px] h-[172px] p-2">
      <img
        src={manga.mangaImage}
        alt="manga-img"
        className="w-[100px] h-full hover:cursor-pointer"
      />
      <div className="flex flex-col w-full">
        <Link
          to={`/${manga.mangaTitle.replace(/\s+/g, "-")}`}
          className="ml-3 mt-1 hover:text-primary hover:cursor-pointer"
        >
          {manga.mangaTitle}
        </Link>
        {sortChapters(manga.chapters)
          .slice(0, 3)
          .map((chapter) => (
            <Chapter key={chapter.chapterID} chapter={chapter} />
          ))}
      </div>
    </div>
  );
}
