import { navLinks } from "../constants";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between w-full p-2 bg-primary">
      <div className="flex items-center font-poppins text-white">
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
      </div>

      {/* SearchBar */}
      <SearchBar />
    </nav>
  );
}
