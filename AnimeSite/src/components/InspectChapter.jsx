import { Link, useLocation } from "react-router-dom";

export default function InspectChapter({ manga, chapter }) {
  const location = useLocation();
  const path = location.pathname;
  const currentPath = path.substring(0, path.lastIndexOf("/"));

  const previousChapter = manga.chapters.find(
    (c) => c.chapterNumber === chapter.chapterNumber - 1
  );
  const nextChapter = manga.chapters.find(
    (c) => c.chapterNumber === chapter.chapterNumber + 1
  );

  const NavigationInterface = () => {
    return (
      <div className="flex justify-between mt-4">
        <div className="p-2">Dropdown</div>
        <div className="flex items-center text-xs text-white">
          <Link
            to={
              previousChapter
                ? `${currentPath}/${previousChapter.chapterNumber}`
                : null
            }
            className={` rounded-full px-5 py-2 font-bold ${
              previousChapter ? "bg-primary" : "bg-gray-600"
            }`}
          >
            &lt; Prev
          </Link>
          <Link
            to={
              nextChapter ? `${currentPath}/${nextChapter.chapterNumber}` : null
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
    <section className="w-[1200px] h-auto font-poppins">
      {/* Title */}
      <h2 className="flex justify-center font-semibold text-white text-[20px]">
        {manga.mangaTitle} Chapter {chapter.chapterNumber}
      </h2>
      {/* All Chapters */}
      <p className="flex justify-center items-center text-dimWhite text-[14px]">
        All chapters are in
        <Link
          to={`/${manga.mangaTitle.replace(/\s+/g, "-")}`}
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
          to={`/${manga.mangaTitle.replace(/\s+/g, "-")}`}
          className="hover:text-primary mx-2 transition-colors duration-300"
        >
          {manga.mangaTitle}
        </Link>
        <p>&gt;</p>
        <Link
          to={`/${manga.mangaTitle.replace(/\s+/g, "-")}/${
            chapter.chapterNumber
          }`}
          className="hover:text-primary mx-2 transition-colors duration-300"
        >
          Chapter {chapter.chapterNumber}
        </Link>
      </div>
      {/* Navigation */}
      <NavigationInterface />
      {/* Dummy "Content" */}
      <div className="w-full h-[1500px] flex justify-center items-center bg-quaternary text-[516px] mt-4">
        {chapter.chapterNumber}
      </div>
      <NavigationInterface />
      {/* Related Series */}
      <div></div>
      {/* Comments */}
      <div></div>
    </section>
  );
}
