import { useContext } from "react";

import InspectChapter from "./InspectView/Chapter/InspectChapter";
import LatestUpdate from "./LatestUpdate/LatestUpdate";
import PopularToday from "./PopularToday/PopularToday";
import Inspect from "./InspectView/Manga/Inspect";
import Register from "./LoginRegister/Register";
import Stored from "./BookmarkView/Bookmarks";
import Profile from "./ProfileView/Profile";
import Login from "./LoginRegister/Login";
import Comics from "./ComicsView/Comics";
import Create from "./CreateView/Create";
import Popular from "./Popular/Popular";
import Trending from "./Trending";
import Carousel from "./Carousel";

import ComicsProvider from "./ComicsProvider";

export default function Hero({ view, mangaID, chapterNumber }) {
  const { comics } = useContext(ComicsProvider);

  let includeSidebar = true;
  let bodyContent;

  // if (mangaID) {
  //   const manga = comics.find((comic) => comic.mangaID === mangaID);
  //   if (chapterNumber) {
  //     const chapter = manga.chapters.find(
  //       (c) => c.chapterNumber === chapterNumber
  //     );
  //     bodyContent = <InspectChapter manga={manga} chapter={chapter} />;
  //     includeSidebar = false;
  //   }
  // }
  switch (view) {
    case "bookmarks":
      bodyContent = <Stored />;
      break;
    case "inspect":
      bodyContent = <Inspect />;
      break;
    case "comics":
      bodyContent = <Comics />;
      break;
    case "management":
      bodyContent = <Create />;
      break;
    case "login":
      bodyContent = <Login />;
      includeSidebar = false;
      break;
    case "register":
      bodyContent = <Register />;
      includeSidebar = false;
      break;
    case "profile":
      bodyContent = <Profile />;
      break;
    default:
      bodyContent = (
        <div>
          <div className="flex justify-between">
            <Carousel />
            <Trending />
          </div>
          <PopularToday />
          <LatestUpdate />
        </div>
      );
      break;
  }

  return (
    <section className="flex mt-10">
      <div className="flex flex-col">{bodyContent}</div>
      {includeSidebar ? (
        <div id="sidebar">
          <Popular />
        </div>
      ) : null}
    </section>
  );
}
