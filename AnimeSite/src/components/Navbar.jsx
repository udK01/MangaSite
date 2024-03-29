import { Link } from "react-router-dom";
import { navLinks } from "../constants";
import Header from "./Header";

export default function Navbar() {
  return (
    <>
      <Header />
      <nav className="flex w-full bg-primary">
        <div className="flex justify-between mx-auto w-[1150px] font-poppins text-white text-[14.5px]">
          <div className="flex hover:cursor-pointer">
            {navLinks.slice(0, -1).map((link, index) => (
              <Link
                key={link.id}
                to={`/${link.id}`}
                className={`${
                  index !== navLinks.length - 2 ? "mr-5" : "mr-0"
                } hover:bg-secondary p-2 transition-all duration-300`}
              >
                {link.title}
              </Link>
            ))}
          </div>
          {navLinks.length > 0 && (
            <div>
              <Link className="flex items-center p-2 transition-all duration-300 hover:bg-secondary hover:cursor-pointer">
                {navLinks[navLinks.length - 1].title}
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
