import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { logo } from "../assets";

export default function Header() {
  return (
    <div className="flex w-full bg-tertiary">
      <div className="flex items-center justify-between px-5 py-1.5 w-[1200px] mx-auto">
        <Link to="/" className="hover:cursor-pointer">
          <img
            src={logo}
            alt="logo"
            className="w-[50px] h-[50px] object-contain"
          />
        </Link>
        <SearchBar />
      </div>
    </div>
  );
}
