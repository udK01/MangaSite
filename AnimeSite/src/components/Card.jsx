import { slides } from "../constants";
import Chapter from "./Chapter";

export default function Card() {
  return (
    <div className="flex w-[403px] h-[172px] p-2">
      <img src={slides[1].src} alt="manga-img" className="w-[100px] h-full" />
      <div className="flex flex-col w-full">
        <h2 className="ml-3 mt-1 hover:text-primary hover:cursor-pointer">
          Example Title
        </h2>
        <Chapter />
        <Chapter />
        <Chapter />
      </div>
    </div>
  );
}
