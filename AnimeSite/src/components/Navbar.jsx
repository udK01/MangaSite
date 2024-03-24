import { navLinks } from "../constants";
import SearchBar from "./SearchBar";
import { logo } from "../assets";

export default function Navbar() {
  return (
    <>
      <div className="bg-tertiary w-full">
        <img
          src={logo}
          alt="logo"
          className="w-[50px] h-[50px] object-contain"
        />
      </div>
      <nav className="mx-auto p-2 w-full bg-primary">
        <div className="flex justify-center font-poppins text-white">
          {/* Logo */}
          {/* Add your logo component here */}

          {/* Navigation links */}
          {navLinks.map((link, index) => (
            <div
              key={link.id}
              className={`${index !== navLinks.length - 1 ? "mr-5" : "mr-0"}`}
            >
              {link.title}
            </div>
          ))}
          <SearchBar />
        </div>
      </nav>
    </>
  );
}
