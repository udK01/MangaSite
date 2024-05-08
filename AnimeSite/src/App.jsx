import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { UserProvider } from "./components/UserContext";
import Home from "./routes/Home";
import axios from "axios";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [comics, setComics] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    // Fetch users and mangas only if not already loaded
    if (!dataLoaded) {
      axios
        .get(`/api/mangas`)
        .then((response) => {
          setComics(response.data);
          setDataLoaded(true);
        })
        .catch((error) => {
          console.error(`Error fetching data:`, error);
        });
    }
  }, [dataLoaded]);

  function sortByUploadDate() {
    comics.sort((a, b) => {
      if (a.chapters.length > 0 && b.chapters.length > 0) {
        const dateA = new Date(a.chapters[0].uploadDate);
        const dateB = new Date(b.chapters[0].uploadDate);
        return dateB - dateA;
      } else if (a.chapters.length === 0 && b.chapters.length > 0) {
        return 1;
      } else if (a.chapters.length > 0 && b.chapters.length === 0) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  // Define common props
  const commonProps = { comics, setComics };

  // Define static routes
  const routes = [
    { path: "/", view: "home" },
    { path: "/bookmarks", view: "bookmarks" },
    { path: "/comics", view: "comics" },
    { path: "/management", view: "management" },
    { path: "/register", view: "register" },
    { path: "/login", view: "login" },
    { path: "/profile", view: "profile" },
  ];

  // Generate dynamic routes based on comics & chapter data
  const dynamicRoutes = comics.flatMap((comic) => {
    const mangaRoute = {
      path: `/${comic.mangaTitle.replace(/\s+/g, "-")}`,
      mangaID: comic.mangaID,
    };

    const chapterRoutes = comic.chapters.map((chapter) => ({
      path: `/${comic.mangaTitle.replace(/\s+/g, "-")}/${
        chapter.chapterNumber
      }`,
      mangaID: comic.mangaID,
      chapterNumber: chapter.chapterNumber,
    }));

    return [mangaRoute, ...chapterRoutes];
  });

  // Render routes only if data is loaded
  return (
    <Router>
      <ScrollToTop />
      <UserProvider>
        {dataLoaded && (
          <Routes>
            {sortByUploadDate()}
            {/* Render static routes */}
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<Home {...commonProps} view={route.view} />}
              />
            ))}

            {/* Render dynamic routes */}
            {dynamicRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  <Home
                    {...commonProps}
                    mangaID={route.mangaID}
                    chapterNumber={route.chapterNumber}
                  />
                }
              />
            ))}
          </Routes>
        )}
      </UserProvider>
    </Router>
  );
}
