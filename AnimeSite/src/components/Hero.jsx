import Carousel from "./Carousel";
import Trending from "./Trending";
import Popular from "./Popular";

export default function Hero() {
  return (
    <section>
      <div id="body" className="flex mt-16 ">
        <div className="flex justify-between">
          <Carousel />
          <Trending />
        </div>
        <div id="sidebar">
          <Popular />
        </div>
      </div>
    </section>
  );
}
