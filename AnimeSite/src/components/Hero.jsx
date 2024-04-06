import InspectChapter from "./InspectChapter";
import LatestUpdate from "./LatestUpdate";
import PopularToday from "./PopularToday";
import Carousel from "./Carousel";
import Trending from "./Trending";
import AddComic from "./AddComic";
import Inspect from "./Inspect";
import Popular from "./Popular";
import Stored from "./Stored";

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
      bodyContent = <Inspect user={user} manga={manga} />;
    }
  } else {
    switch (view) {
      case "bookmarks":
        bodyContent = <Stored />;
        break;
      case "comics":
        // bodyContent = <Comics />;
        break;
      case "addComic":
        bodyContent = <AddComic />;
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
