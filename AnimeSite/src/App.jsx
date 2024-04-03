import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./routes/Home";
import axios from "axios";

export default function App() {
  const [user, setUser] = useState([]);
  const [comics, setComics] = useState([]);

  useEffect(() => {
    //Fetch users.
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

  // Define routes
  const routes = [
    { path: "/", view: "home" },
    { path: "/bookmarks", view: "bookmarks" },
    { path: "/comics", view: "comics" },
  ];

  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<Home {...commonProps} view={route.view} />}
          />
        ))}
        <Route path="/addComic" />
      </Routes>
    </Router>
  );
}
