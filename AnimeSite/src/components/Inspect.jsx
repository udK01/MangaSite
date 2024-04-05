import Separator from "./Separator";
import StarRating from "./StarRating";
import { Link, useLocation } from "react-router-dom";
import { FaRegBookmark } from "react-icons/fa";

export default function Inspect({ manga }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const SideInfo = ({ label, value, isHoverable = false }) => (
    <div className="flex justify-between w-full bg-quinary p-1 px-2 rounded-md text-dimWhite mt-2">
      <div>{label}</div>
      <div
        className={
          isHoverable
            ? "text-white hover:text-primary hover:cursor-pointer"
            : ""
        }
      >
        {value}
      </div>
    </div>
  );

  const BodyInfo = ({ lLabel, lValue, rLabel, rValue }) => (
    <div className="w-full flex text-[14px] mt-4">
      <div className="flex flex-col flex-1 flex-grow">
        <div>{lLabel}</div>
        <div className="text-dimWhite">{lValue}</div>
      </div>
      <div className="flex flex-col flex-1 flex-grow">
        <div>{rLabel}</div>
        <div className="text-dimWhite">{rValue}</div>
      </div>
    </div>
  );

  function reverseChapters(chapters) {
    return chapters.sort((a, b) => b.chapterNumber - a.chapterNumber);
  }

  return (
    <section className="w-[826px] h-auto font-poppins">
      {/* Route */}
      <div className="flex text-[14px] w-full bg-quaternary rounded-sm text-white p-2">
        <Link
          to={"/"}
          className="hover:text-primary mr-2 transition-colors duration-300"
        >
          Home
        </Link>
        <p className="transition-colors duration-300">&gt;</p>
        <Link
          to={`/${manga.mangaTitle.replace(/\s+/g, "-")}`}
          className="hover:text-primary mx-2 transition-colors duration-300"
        >
          {manga.mangaTitle}
        </Link>
      </div>
      {/* Body */}
      <div className="flex w-full h-auto bg-quaternary mt-10 p-4">
        {/* Left Side */}
        <div id="left" className="flex flex-col w-[180px] flex-shrink-0">
          <img src={manga.mangaImage} alt={manga.mangaTitle} />
          <button className="w-full flex items-center justify-center text-white p-2 bg-primary rounded-md mt-2 text-[14px] hover:bg-purple-800">
            <FaRegBookmark /> Bookmark
          </button>
          <p className="flex justify-center text-dimWhite text-[12px] my-1">
            Followed by {0} people
          </p>
          <div>
            <div className="w-full flex justify-between items-center bg-quinary px-2 p-[2px] rounded-md text-dimWhite">
              <div className="h-full pb-1 flex items-center">
                <StarRating rating={manga.rating} includeText={false} />
              </div>
              {manga.rating}
            </div>

            <SideInfo label="Status" value={manga.status} />
            <SideInfo label="Type" value={manga.type} isHoverable={true} />
          </div>
        </div>
        {/* Right Side */}
        <div id="right" className="ml-4 text-white w-full">
          {/* Title - Summary - Description */}
          <h2 className="font-bold text-[20px]">{manga.mangaTitle}</h2>
          <h3 className="mt-3 font-semibold">Summary</h3>
          <p className="mt-1 text-dimWhite text-[14px]">{manga.description}</p>
          {/* Short Info Tags */}
          <BodyInfo
            lLabel={"Released"}
            lValue={"-"}
            rLabel={"Author"}
            rValue={manga.author}
          />
          <BodyInfo
            lLabel={"Artist"}
            lValue={"Unknown"}
            rLabel={""}
            rValue={""}
          />
          <BodyInfo
            lLabel={"Serialisation"}
            lValue={"-"}
            rLabel={"Posted By"}
            rValue={"udK"}
          />
          <BodyInfo
            lLabel={"Posted On"}
            lValue={"September 19, 2023"}
            rLabel={"Updated On"}
            rValue={"April 2, 2024"}
          />
          <div className="flex flex-col">
            <div className="text-[14px] mt-4">Genres</div>
            <div className="flex flex-wrap text-[14px]">
              {manga.genres.map((genre, index) => (
                <p
                  key={index}
                  className={`bg-quinary rounded-md py-1 px-3 mt-2 transition-colors duration-300 hover:cursor-pointer hover:text-primary ${
                    index > 0 ? "ml-2" : "ml-0"
                  }`}
                >
                  {genre}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Chapters */}
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
                  autoComplete="off"
                />
                {/* Scrollable Chapters */}
                <div className="scrollbar-thumb-primary  scrollbar-track-transparent">
                  <ul className="h-auto max-h-[297px] overflow-y-auto scrollbar-thin px-1">
                    {reverseChapters(manga.chapters).map((chapter) => (
                      <li
                        key={chapter.chapterID}
                        className="py-1 px-3 text-[14px] outline outline-[1px] mt-4 outline-quinary rounded-md hover:cursor-pointer hover:bg-quinary"
                      >
                        <Link
                          to={`${currentPath}/${chapter.chapterNumber}`}
                          className="text-white hover:text-primary"
                        >
                          Chapter {chapter.chapterNumber} -{" "}
                          {chapter.chapterTitle}
                        </Link>
                        <div className="text-dimWhite text-[12px]">
                          April 2, 2024
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
    </section>
  );
}