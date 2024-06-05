import { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiAlignJustify } from "react-icons/fi";
import Separator from "../Separator";
import UserContext from "../UserContext";
import ComicsContext from "../ComicsProvider";

export default function VerticalNavbar() {
  const [show, setShow] = useState(false);
  const { user } = useContext(UserContext);
  const { comics } = useContext(ComicsContext);
  const [path, setPath] = useState(
    `/inspect?manga=${
      comics[Math.floor(Math.random() * comics.length)].mangaID
    }`
  );

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  function toggleShow(state) {
    setShow(state !== undefined ? state : !show);
  }

  function randomPath() {
    setPath(
      `/inspect?manga=${
        comics[Math.floor(Math.random() * comics.length)].mangaID
      }`
    );
  }

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      toggleShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div
        tabIndex="0"
        onClick={() => toggleShow()}
        style={{ display: "inline-block" }}
        ref={buttonRef}
      >
        <FiAlignJustify size={32} color="white" />
      </div>
      {show && (
        <div
          ref={dropdownRef}
          className="w-[150px] h-auto flex flex-col space-y-1 p-2 items-center -translate-x-[98px] border-2 border-primary bg-secondary absolute z-20"
        >
          <Link to={"/"} onClick={() => toggleShow(false)}>
            Home
          </Link>
          <Separator />
          <Link to={"/bookmarks"} onClick={() => toggleShow(false)}>
            Bookmarks
          </Link>
          <Separator />
          <Link to={"/comics"} onClick={() => toggleShow(false)}>
            Comics
          </Link>
          <Separator />
          <Link
            to={path}
            onClick={() => {
              randomPath();
              toggleShow(false);
            }}
            className="text-orange-500"
          >
            Surprise Me
          </Link>
          {user.length > 0 && user[0].accessLevel > 0 && (
            <>
              <Separator />
              <Link to={"/management"} onClick={() => toggleShow(false)}>
                Management
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
