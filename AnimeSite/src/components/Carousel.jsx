import { useState, useEffect } from "react";
import { slides, slide_timer } from "../constants";

export default function Carousel() {
  let [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, slide_timer);

    return () => clearTimeout(timer);
  }, [current]);

  const nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  return (
    <div className="overflow-hidden relative">
      <div
        className={`flex transition ease-out duration-40`}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((s) => {
          return <img key={s.src} src={s.src} alt="carousel-img" />;
        })}
      </div>

      <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
        {slides.map((s, index) => (
          <div
            key={"circle" + index}
            className={`rounded-full w-3 h-3 ${
              index === current ? "bg-yellow-400" : "bg-gray-400"
            } `}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
}
