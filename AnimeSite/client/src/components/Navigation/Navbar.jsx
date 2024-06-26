import { Link } from "react-router-dom";
import { navLinks } from "../../constants";
import { useContext, useState } from "react";

import Header from "../Header";

import ComicsProvider from "../ComicsProvider";
import UserContext from "../UserContext";

export default function Navbar() {
  const { comics } = useContext(ComicsProvider);
  const { user } = useContext(UserContext);
  const [path, setPath] = useState(
    `/inspect?manga=${
      comics[Math.floor(Math.random() * comics.length)].mangaID
    }`
  );

  function randomPath() {
    setPath(
      `/inspect?manga=${
        comics[Math.floor(Math.random() * comics.length)].mangaID
      }`
    );
  }

  return (
    <>
      <Header />
      <nav className="flex w-full bg-primary 2xs:hidden md:inline">
        <div className="flex justify-between w-[78%] mx-auto font-poppins text-white md:text-[14.5px]">
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
          <div className="flex items-center transition-all duration-300">
            {navLinks.length > 0 && (
              <Link to={path} onClick={randomPath}>
                <div className="p-2 hover:bg-secondary hover:cursor-point">
                  {navLinks[navLinks.length - 1].title}
                </div>
              </Link>
            )}
            {user && user.length > 0 && user[0].accessLevel > 0 && (
              <Link
                to={`/management`}
                className="ml-2 p-2 hover:bg-secondary hover:cursor-pointer"
              >
                Management
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
