import { Link } from "react-router-dom";
import { logo } from "../assets";
import { useState, useContext } from "react";

import VerticalNavbar from "./Navigation/VerticalNavbar";
import SearchBar from "./SearchBar/SearchBar";
import UserContext from "./UserContext";
import Separator from "./Separator";

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
      className={`hover:text-primary hover:cursor-pointer text-[16px]`}
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
          onClick={() => setHover(true)}
          onBlur={() => setHover(false)}
        >
          <img
            src={logo}
            alt="logo"
            className="w-[50px] h-[50px] object-contain hover:cursor-pointer"
          />
          <div
            className={`flex flex-col absolute w-[120px] z-10 items-center p-2 border-2 border-primary bg-secondary ${
              hover ? "" : "hidden"
            }`}
          >
            {user.length > 0 ? (
              <>
                <ListElement location={"profile"} text={"Profile"} />
                <Separator />
                <ListElement location={""} text={"Logout"} />
              </>
            ) : (
              <>
                <ListElement location={"login"} text={"Login"} />
                <Separator />
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
