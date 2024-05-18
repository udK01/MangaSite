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

export default function Hero({ view }) {
  let includeSidebar = true;
  let bodyContent;

  switch (view) {
    case "bookmarks":
      bodyContent = <Stored />;
      break;
    case "inspect":
      bodyContent = <Inspect />;
      break;
    case "chapter":
      bodyContent = <InspectChapter />;
      includeSidebar = false;
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
        <div className="2xs:flex 2xs:flex-col 2xs:items-center md:inline md:items-start">
          <div className="flex">
            <Carousel />
            <div className="2xs:hidden md:inline">
              <Trending />
            </div>
          </div>
          {/* <PopularToday />
          <LatestUpdate /> */}
        </div>
      );
      break;
  }

  return (
    <section className="flex mt-10 2xs:flex-col md:flex-col lg:flex-row">
      <div className="flex flex-col 2xs:justify-center md:justify-normal items-center">
        {bodyContent}
      </div>
      {includeSidebar && (
        <div
          id="sidebar"
          className="2xs:flex 2xs:justify-center md:inline-block"
        >
          <Popular />
        </div>
      )}
    </section>
  );
}
