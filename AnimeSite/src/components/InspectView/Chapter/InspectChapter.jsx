import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import DropDown from "../../DropDown";
import RelatedSeries from "./RelatedSeries";
import Comments from "../Comments";

import ComicsProvider from "../../ComicsProvider";

export default function InspectChapter() {
  const location = useLocation();

  const navigate = useNavigate();
  const path = location.pathname;

  const currentPath = path.substring(0, path.lastIndexOf("/"));

  const { comics } = useContext(ComicsProvider);

  const [manga, setManga] = useState([]);
  const [chapter, setChapter] = useState([]);

  const [changeChapter, setChangeChapter] = useState("");
  const [chapterDisplay, setChapterDisplay] = useState([]);
  const [previousChapter, setPreviousChapter] = useState(null);
  const [nextChapter, setNextChapter] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const mID = parseInt(searchParams.get("manga"), 10);
    const cNum = parseInt(searchParams.get("chapter"), 10);

    const foundManga = comics.find((comic) => comic.mangaID === mID);
    const foundChapter = foundManga.chapters.find(
      (chapter) => chapter.chapterNumber === cNum
    );

    setManga(foundManga);
    setChapter(foundChapter);

    setChangeChapter(
      `Chapter ${foundChapter.chapterNumber} ${
        foundChapter.chapterTitle && `- ${foundChapter.chapterTitle}`
      }`
    );

    setChapterDisplay(
      foundManga.chapters
        .sort((a, b) => b.chapterNumber - a.chapterNumber)
        .map(
          (c) =>
            `Chapter ${c.chapterNumber} ${
              c.chapterTitle && `- ${c.chapterTitle}`
            }`
        )
    );

    setPreviousChapter(
      foundChapter.chapterNumber - 1 > 0 ? foundChapter.chapterNumber - 1 : null
    );

    setNextChapter(
      foundChapter.chapterNumber + 1 <= foundManga.chapters.length
        ? foundChapter.chapterNumber + 1
        : null
    );
  }, [location.search]);

  useEffect(() => {
    // Fetch only the chapter number.
    const newChapterNum = changeChapter
      .split("-")[0]
      .replace("Chapter ", "")
      .trim();

    const mangaID = manga.mangaID;
    mangaID &&
      navigate(
        `${currentPath}/chapters?manga=${manga.mangaID}&chapter=${newChapterNum}`
      );
  }, [changeChapter]);

  const NavigationInterface = () => {
    return (
      <div className="flex justify-between mt-4">
        <DropDown
          options={chapterDisplay}
          value={changeChapter}
          func={setChangeChapter}
          className={"md:w-[400px] 2xs:w-[200px] px-4 rounded-2xl bg-tertiary"}
        />
        <div className="flex items-center text-xs text-white mx-4">
          <Link
            to={
              previousChapter
                ? `${currentPath}/chapters?manga=${manga.mangaID}&chapter=${previousChapter}`
                : `${currentPath}/chapters?manga=${manga.mangaID}&chapter=${chapter.chapterNumber}`
            }
            className={`rounded-full px-5 py-2 font-bold ${
              previousChapter ? "bg-primary" : "bg-gray-600"
            }`}
          >
            &lt; Prev
          </Link>
          <Link
            to={
              nextChapter
                ? `${currentPath}/chapters?manga=${manga.mangaID}&chapter=${nextChapter}`
                : `${currentPath}/chapters?manga=${manga.mangaID}&chapter=${chapter.chapterNumber}`
            }
            className={`rounded-full px-5 py-2 ml-3 font-bold ${
              nextChapter ? "bg-primary" : "bg-gray-600"
            }`}
          >
            Next &gt;
          </Link>
        </div>
      </div>
    );
  };

  return (
    <section className="w-full 2xs:min-w-[410px] md:min-w-[768px] lg:min-w-[1060px] xl:min-w-[1200px] h-auto font-poppins">
      {/* Title */}
      <h2 className="flex justify-center text-center font-semibold text-white text-[20px]">
        {manga.mangaTitle} Chapter {chapter.chapterNumber}
      </h2>
      {/* All Chapters */}
      <p className="flex flex-row 2xs:flex-col justify-center items-center text-dimWhite text-[14px]">
        All chapters are in
        <Link
          to={`/inspect?manga=${manga.mangaID}`}
          className="ml-1 text-primary"
        >
          {manga.mangaTitle}
        </Link>
      </p>
      {/* Route */}
      <div className="flex justify-center mt-5 text-[14px] w-full bg-quaternary rounded-sm text-white p-2">
        <Link
          to={"/"}
          className="hover:text-primary mr-2 transition-colors duration-300"
        >
          Home
        </Link>
        <p>&gt;</p>
        <Link
          to={`/inspect?manga=${manga.mangaID}`}
          className="w-full 2xs:w-[220px] line-clamp-1 hover:text-primary mx-2 transition-colors duration-300"
        >
          {manga.mangaTitle}
        </Link>
        <p>&gt;</p>
        <Link
          to={`${location.pathname}${location.search}`}
          className="hover:text-primary mx-2 transition-colors duration-300"
        >
          Chapter {chapter.chapterNumber}
        </Link>
      </div>
      {/* Top Navigation */}
      <NavigationInterface />
      {/* Dummy "Content" */}
      <div className="w-full h-[1500px] flex justify-center items-center bg-quaternary text-[516px] mt-4">
        {chapter.chapterNumber}
      </div>
      {/* Bottom Navigation */}
      <NavigationInterface />
      {/* Related Series */}
      <RelatedSeries />
      {/* Comments */}
      <Comments />
    </section>
  );
}
