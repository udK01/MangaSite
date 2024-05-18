import { useContext, useState } from "react";

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

  function toggleShow() {
    setShow(!show);
  }

  function randomPath() {
    setPath(
      `/inspect?manga=${
        comics[Math.floor(Math.random() * comics.length)].mangaID
      }`
    );
  }

  return (
    <div>
      <FiAlignJustify size={32} color="white" onClick={() => toggleShow()} />
      {show && (
        <div className="w-[150px] h-auto flex flex-col space-y-1 p-2 items-center -translate-x-[98px] border-2 border-primary bg-secondary absolute z-20">
          <Link to={"/"} onClick={() => toggleShow()}>
            Home
          </Link>
          <Separator />
          <Link to={"/bookmarks"} onClick={() => toggleShow()}>
            Bookmarks
          </Link>
          <Separator />
          <Link to={"/comics"} onClick={() => toggleShow()}>
            Comics
          </Link>
          <Separator />
          <Link
            to={path}
            onClick={() => {
              randomPath();
              toggleShow();
            }}
            className="text-orange-500"
          >
            Surprise Me
          </Link>
          {user.length > 0 && user[0].accessLevel > 0 && (
            <>
              <Separator />
              <Link to={"/management"} onClick={() => toggleShow()}>
                Management
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
