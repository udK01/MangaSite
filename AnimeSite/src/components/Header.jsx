import { Link } from "react-router-dom";
import { logo } from "../assets";
import { useState, useContext } from "react";

import VerticalNavbar from "./Navigation/VerticalNavbar";
import SearchBar from "./SearchBar/SearchBar";
import UserContext from "./UserContext";

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const [hover, setHover] = useState(false);

  const Logout = () => {
    setUser([]);
    localStorage.removeItem("username");
  };

  const ListElement = ({ location, text }) => (
    <Link
      to={
        text === "Profile"
          ? `/profile?user=${user[0].username}`
          : `/${location}`
      }
      className={`hover:text-primary hover:cursor-pointer mb-3 md:text-[16px] 2xs:text-[24px]`}
      onClick={() => text !== "Profile" && Logout()}
    >
      {text}
    </Link>
  );

  return (
    <div className="flex w-full md:bg-tertiary 2xs:bg-primary font-poppins text-white">
      <div className="flex items-center justify-between px-5 py-1.5 md:w-[80%] 2xs:w-full mx-auto">
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Link to="/" className="hover:cursor-pointer">
            <img
              src={logo}
              alt="logo"
              className="w-[50px] h-[50px] object-contain"
            />
          </Link>
          <div
            className={`flex flex-col absolute w-[120px] z-10 px-5 py-2 border-2 border-tertiary bg-secondary ${
              hover ? "" : "hidden"
            }`}
          >
            {user.length > 0 ? (
              <>
                <ListElement location={"profile"} text={"Profile"} />
                <ListElement location={""} text={"Logout"} />
              </>
            ) : (
              <>
                <ListElement location={"login"} text={"Login"} />
                <ListElement location={"register"} text={"Register"} />
              </>
            )}
          </div>
        </div>
        <SearchBar />
        <div className="md:hidden 2xs:inline">
          <VerticalNavbar />
        </div>
      </div>
    </div>
  );
}
