import { Link, useLocation } from "react-router-dom";
import Separator from "../../Separator";
import { useState } from "react";

export default function MangaChapters({
  manga,
  reverseChapters,
  getFormattedDate,
}) {
  const [filteredChapters, setFilteredChapters] = useState(
    reverseChapters(manga.chapters)
  );

  const location = useLocation();
  const currentPath = location.pathname;

  // Filter for Dynamic Search
  function filterChapters(e) {
    if (e === "") {
      setFilteredChapters(reverseChapters(manga.chapters));
    } else {
      const filtered = reverseChapters(manga.chapters).filter((chapter) =>
        chapter.chapterNumber.toString().includes(e)
      );
      setFilteredChapters(filtered);
    }
  }

  return (
    <div className="w-full bg-quaternary h-auto mt-10 p-4">
      {/* Manga Title For Chapters */}
      <div className="font-semibold text-white text-[14px]">
        Chapter {manga.mangaTitle}
      </div>
      <Separator />
      <div className="flex">
        {manga.chapters.length > 0 ? (
          <div className="w-full">
            {/* Chapter Buttons */}
            <div className="flex w-full text-white">
              <Link
                to={`${currentPath}/1`}
                className="w-full flex flex-col flex-1 items-center py-3 bg-primary rounded-md mr-1 hover:bg-purple-800"
              >
                <div>First Chapter</div>
                <div className="font-semibold text-[20px]">Chapter 1</div>
              </Link>
              <Link
                to={`${currentPath}/${manga.chapters[0].chapterNumber}`}
                className="w-full flex flex-col flex-1 items-center py-3 bg-primary rounded-md ml-1 hover:bg-purple-800"
              >
                <div>New Chapter</div>
                <div className="font-semibold text-[20px]">
                  Chapter {manga.chapters.length}
                </div>
              </Link>
            </div>
            {/* Search Bar */}
            <div>
              <input
                className="w-full mt-4 px-4 py-1 rounded-md border-2 bg-quinary border-gray-800 text-dimWhite focus:outline-none"
                placeholder={`Search Chapter. Example: 1 or ${manga.chapters.length}`}
                onChange={(e) => filterChapters(e.target.value)}
                autoComplete="off"
              />
              {/* Scrollable Chapters */}
              <div className="scrollbar-thumb-primary scrollbar-track-transparent">
                <ul className="h-auto max-h-[297px] overflow-y-auto scrollbar-thin px-1">
                  {filteredChapters.map((chapter) => (
                    <li
                      key={chapter.chapterID}
                      className="py-1 px-3 text-[14px] outline outline-[1px] mt-4 outline-quinary rounded-md hover:cursor-pointer hover:bg-quinary"
                    >
                      <Link
                        to={`${currentPath}/${chapter.chapterNumber}`}
                        className="text-white hover:text-primary"
                      >
                        Chapter {chapter.chapterNumber} - {chapter.chapterTitle}
                      </Link>
                      <div className="text-dimWhite text-[12px]">
                        {getFormattedDate(chapter.uploadDate)}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <button className="w-full flex justify-center py-8 rounded-md text-white bg-primary">
            Coming Soon...
          </button>
        )}
      </div>
    </div>
  );
}
