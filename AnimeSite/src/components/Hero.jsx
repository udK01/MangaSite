import Carousel from "./Carousel";

export default function Hero() {
  return (
    <>
      <div id="body">
        <div className="w-[75%] h-[50%] m-auto mt-11">
          <Carousel />
        </div>
      </div>
      <div id="sidebar"></div>
    </>
  );
}
