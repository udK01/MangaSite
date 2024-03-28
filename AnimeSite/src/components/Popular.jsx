import { useState } from "react";
import Separator from "./Separator";
import PopularCard from "./PopularCard";

export default function Popular() {
  const [current, setCurrent] = useState(0);

  return (
    <div className="w-[340px] p-3 ml-3 bg-quaternary rounded-sm text-white">
      {/* "Popular" text */}
      <div>
        <p className="font-poppins">Popular</p>
      </div>
      {/* Separator */}
      <Separator />
      {/* Button Container */}
      <div className="flex justify-between bg-quinary p-2 rounded-sm mb-4">
        <div
          className={`${
            current === 0 ? "bg-primary transition-all duration-300" : ""
          } flex-1 rounded-md flex justify-center items-center`}
        >
          <button onClick={() => setCurrent(0)}>Weekly</button>
        </div>
        <div
          className={`${
            current === 1 ? "bg-primary transition-all duration-300" : ""
          } flex-1 rounded-md flex justify-center items-center`}
        >
          <button onClick={() => setCurrent(1)}>Monthly</button>
        </div>
        <div
          className={`${
            current === 2 ? "bg-primary transition-all duration-300" : ""
          } flex-1 rounded-md flex justify-center items-center`}
        >
          <button onClick={() => setCurrent(2)}>All</button>
        </div>
      </div>
      {/* Cards */}
      <ul className="flex flex-col">
        {[...Array(10).keys()].map((_, i) => (
          <li key={i}>
            <PopularCard />
            {i !== 9 ? <Separator /> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
