import { useState, useContext } from "react";

import Separator from "../Separator";
import Card from "./BookmarkCard";

import ComicsProvider from "../ComicsProvider";
import UserContext from "../UserContext";

export default function Bookmarks() {
  const { user } = useContext(UserContext);
  const { comics } = useContext(ComicsProvider);
  const [showDelete, setShowDelete] = useState(false);
  const [bookmarks, setBookmarks] =
    user.length > 0 ? useState(user[0].bookmarks) : useState([]);

  function findManga(id) {
    return comics.find((manga) => manga.mangaID === id);
  }

  function toggleDelete() {
    setShowDelete(!showDelete);
  }

  return (
    <section className="w-auto md:max-w-[825px] 2xs:max-w-[1100px] mb-10 2xs:h-auto bg-quaternary rounded-sm font-poppins">
      <div className="flex justify-between my-4 mx-4 text-white">
        <p>Bookmarks</p>
        <button
          className="px-5 py-0.5 bg-red-600 rounded-md"
          onClick={toggleDelete}
        >
          Delete
        </button>
      </div>
      <Separator />
      <div className="my-4 mx-4 text-dimWhite bg-quinary p-2 rounded-md text-[13px]">
        You can save a list of manga titles here up to 200. The list approves
        based on the latest update date. The list of manga is stored in a
        browser that you can use right now.
      </div>
      {bookmarks.length <= 0 ? (
        <h4 className="flex items-center justify-center mt-7 font-bold text-dimWhite mb-6">
          YOU HAVE NO BOOKMARKS, NOTHING TO SHOW
        </h4>
      ) : (
        <div className="w-full flex flex-wrap">
          {bookmarks.map((bookmark, i) => (
            <div key={i}>
              <Card
                manga={findManga(bookmark.mangaID)}
                showDelete={showDelete}
                setBookmarks={setBookmarks}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
