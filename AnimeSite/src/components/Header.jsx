import { Link } from "react-router-dom";
import { logo } from "../assets";
import { useState, useContext } from "react";

import SearchBar from "./SearchBar";
import UserContext from "./UserContext";

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const [hover, setHover] = useState(false);

  const Logout = () => {
    setUser([]);
  };

  const ListElement = ({ location, text }) => (
    <Link
      to={`/${location}`}
      className={`hover:text-primary hover:cursor-pointer mb-3`}
      onClick={() => Logout()}
    >
      {text}
    </Link>
  );

  return (
    <div className="flex w-full bg-tertiary font-poppins text-white">
      <div className="flex items-center justify-between px-5 py-1.5 w-[1200px] mx-auto">
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
            className={`flex flex-col absolute w-[120px] px-5 py-2 border-2 border-tertiary bg-secondary ${
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
      </div>
    </div>
  );
}
