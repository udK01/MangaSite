import InspectChapter from "./InspectChapter";
import LatestUpdate from "./LatestUpdate";
import PopularToday from "./PopularToday";
import Carousel from "./Carousel";
import Trending from "./Trending";
import AddComic from "./AddComic";
import Inspect from "./Inspect";
import Popular from "./Popular";
import Stored from "./Stored";

export default function Hero({ comics, view, mangaID, chapterID }) {
  let bodyContent;

  if (mangaID) {
    const manga = comics.find((comic) => comic.mangaID === mangaID);
    if (chapterID) {
      console.log("Chapter");
      const chapter = manga.chapters.find((c) => c.chapterID === chapterID);
      bodyContent = <InspectChapter chapter={chapter} />;
    } else {
      console.log("Manga");
      bodyContent = <Inspect manga={manga} />;
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
        console.log("Default");
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
      <div id="sidebar">
        <Popular comics={comics} />
      </div>
    </section>
  );
}
