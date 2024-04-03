import LatestUpdate from "./LatestUpdate";
import PopularToday from "./PopularToday";
import Carousel from "./Carousel";
import Trending from "./Trending";
import Popular from "./Popular";
import Stored from "./Stored";

export default function Hero({ comics, view }) {
  let bodyContent;

  switch (view) {
    case "bookmarks":
      bodyContent = <Stored />;
      break;
    case "comics":
    // bodyContent = <Comics />;
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
