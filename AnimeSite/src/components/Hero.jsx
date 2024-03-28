import Carousel from "./Carousel";
import Trending from "./Trending";
import Popular from "./Popular";
import PopularToday from "./PopularToday";

export default function Hero() {
  return (
    <section className="flex mt-16">
      <div id="body" className="flex flex-col">
        <div className="flex justify-between">
          <Carousel />
          <Trending />
        </div>
        <PopularToday />
      </div>
      <div id="sidebar">
        <Popular />
      </div>
    </section>
  );
}
