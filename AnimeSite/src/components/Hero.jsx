import LatestUpdate from "./LatestUpdate";
import PopularToday from "./PopularToday";
import Carousel from "./Carousel";
import Trending from "./Trending";
import Popular from "./Popular";

export default function Hero({ comics }) {
  return (
    <section className="flex mt-16">
      <div id="body" className="flex flex-col">
        <div className="flex justify-between">
          <Carousel comics={comics} />
          <Trending comics={comics} />
        </div>
        <PopularToday comics={comics} />
        <LatestUpdate comics={comics} />
      </div>
      <div id="sidebar">
        <Popular comics={comics} />
      </div>
    </section>
  );
}
