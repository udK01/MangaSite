import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
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
  const [user, setUser] = useState([]);
  const [comics, setComics] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false); // Track data loading state

  useEffect(() => {
    // Fetch users and mangas
    axios
      .all([axios.get(`api/user/${"udk"}`), axios.get(`api/mangas`)])
      .then(
        axios.spread((userResponse, comicsResponse) => {
          setUser(userResponse.data);
          setComics(comicsResponse.data);
          setDataLoaded(true);
        })
      )
      .catch((error) => {
        console.error(`Error fetching data:`, error);
      });
  }, []);

  // Define common props
  const commonProps = { comics, user };

  // Define static routes
  const routes = [
    { path: "/", view: "home" },
    { path: "/bookmarks", view: "bookmarks" },
    { path: "/comics", view: "comics" },
    { path: "/addComic", view: "create" },
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
      {dataLoaded && (
        <Routes>
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
    </Router>
  );
}
