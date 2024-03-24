import { navLinks } from "../constants";
import Header from "./Header";

export default function Navbar() {
  return (
    <>
      <Header />
      <nav className="flex w-full bg-primary">
        <div className="flex justify-between mx-auto w-[1150px] font-poppins text-white">
          <div className="flex">
            {navLinks.slice(0, -1).map((link, index) => (
              <div
                key={link.id}
                className={`${
                  index !== navLinks.length - 2 ? "mr-5" : "mr-0"
                } hover:bg-secondary p-2`}
              >
                {link.title}
              </div>
            ))}
          </div>
          {navLinks.length > 0 && (
            <div>
              <div className="mr-0 hover:bg-secondary p-2">
                {navLinks[navLinks.length - 1].title}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
