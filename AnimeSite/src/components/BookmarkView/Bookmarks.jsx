import { useState } from "react";
import Separator from "../Separator";
import Card from "./BookmarkCard";

export default function Bookmarks({ user, comics }) {
  const [bookmarks, setBookmarks] = useState(user[0].bookmarks);

  // Should make backend request for bookmarks instead of attaching it to user.
  // If users bookmark and swap pages, it won't be correct.

  function findManga(id) {
    return comics.find((manga) => manga.mangaID === id);
  }

  return (
    <section className="w-[854px] h-auto bg-quaternary rounded-sm font-poppins">
      <div className="flex justify-between my-4 mx-4 text-white">
        <p>Bookmarks</p>
        <button className="px-5 py-0.5 bg-red-600 rounded-md">Delete</button>
      </div>
      <Separator />
      <div className="my-4 mx-4 text-dimWhite bg-quinary p-2 rounded-md text-[13px]">
        You can save a list of manga titles here up to 200. The list approves
        based on the latest update date. The list of manga is stored in a
        browser that you can use right now.
      </div>
      {bookmarks.length <= 0 ? (
        <h4 className="flex items-center justify-center mt-7 font-bold text-dimWhite">
          YOU HAVE NO BOOKMARKS, NOTHING TO SHOW
        </h4>
      ) : (
        <div className="w-full flex flex-wrap">
          {bookmarks.map((bookmark, i) => (
            <div key={i}>
              <Card manga={findManga(bookmark.mangaID)} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}