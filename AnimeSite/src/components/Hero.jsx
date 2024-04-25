import InspectChapter from "./InspectView/Chapter/InspectChapter";
import LatestUpdate from "./LatestUpdate/LatestUpdate";
import PopularToday from "./PopularToday/PopularToday";
import Inspect from "./InspectView/Manga/Inspect";
import Stored from "./BookmarkView/Bookmarks";
import Comics from "./ComicsView/Comics";
import Create from "./CreateView/Create";
import Popular from "./Popular/Popular";
import Trending from "./Trending";
import Carousel from "./Carousel";

export default function Hero({ user, comics, view, mangaID, chapterNumber }) {
  let includeSidebar = true;
  let bodyContent;

  if (mangaID) {
    const manga = comics.find((comic) => comic.mangaID === mangaID);
    if (chapterNumber) {
      const chapter = manga.chapters.find(
        (c) => c.chapterNumber === chapterNumber
      );
      bodyContent = <InspectChapter manga={manga} chapter={chapter} />;
      includeSidebar = false;
    } else {
      bodyContent = <Inspect user={user} inspect={manga} />;
    }
  } else {
    switch (view) {
      case "bookmarks":
        bodyContent = <Stored user={user} comics={comics} />;
        break;
      case "comics":
        bodyContent = <Comics comics={comics} />;
        break;
      case "management":
        bodyContent = <Create />;
        break;
      default:
        bodyContent = (
          <div>
            <div className="flex justify-between">
              <Carousel comics={comics} />
              <Trending comics={comics} />
            </div>
            <PopularToday comics={comics} />
            <LatestUpdate comics={comics} />
          </div>
        );
        break;
    }
  }

  return (
    <section className="flex mt-10">
      <div id="body" className="flex flex-col">
        {bodyContent}
      </div>
      {includeSidebar ? (
        <div id="sidebar">
          <Popular comics={comics} />
        </div>
      ) : null}
    </section>
  );
}
