import { useState } from "react";
import Separator from "./Separator";

export default function Stored() {
  const [bookmarks, setBookmarks] = useState([]);

  return (
    <section className="w-[826px] h-[212px] bg-quaternary rounded-sm font-poppins">
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
        <h4 className=" flex items-center justify-center mt-7 font-bold text-dimWhite">
          YOU HAVE NO BOOKMARKS, NOTHING TO SHOW
        </h4>
      ) : (
        "Show Bookmarks"
      )}
    </section>
  );
}
