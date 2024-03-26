import { slides } from "../constants";

export default function Trending() {
  return (
    <div className="w-[200px] h-[280px] ml-3">
      <img src={slides[0].src} />
    </div>
  );
}
