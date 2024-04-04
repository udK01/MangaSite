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

  useEffect(() => {
    // Fetch users.
    axios
      .get(`api/user/${"udk"}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching users:`, error);
      });
    // Fetch mangas.
    axios
      .get(`api/mangas`)
      .then((response) => {
        setComics(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching mangas:`, error);
      });
  }, []);

  // Define common props
  const commonProps = { comics, user };

  // Define static routes
  const routes = [
    { path: "/", view: "home" },
    { path: "/bookmarks", view: "bookmarks" },
    { path: "/comics", view: "comics" },
    { path: "/addComic", view: "addComic" },
  ];

  // Generate dynamic routes based on comics data
  const comicRoutes = comics.map((comic) => ({
    path: `/${comic.mangaTitle.replace(/\s+/g, "-")}`,
    id: comic.mangaID,
  }));

  return (
    <Router>
      <ScrollToTop />
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
        {comicRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<Home {...commonProps} view={route.id} />}
          />
        ))}
      </Routes>
    </Router>
  );
}
