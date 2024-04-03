import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./routes/Home";
import Bookmarks from "./routes/Bookmarks";
import Comics from "./routes/Comics";
import axios from "axios";

export default function App() {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    axios
      .get(`api/mangas`)
      .then((response) => {
        setComics(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching mangas:`, error);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home comics={comics} />} />
        <Route path="/bookmarks" element={<Bookmarks comics={comics} />} />
        <Route path="/comics" element={<Comics />} />
      </Routes>
    </Router>
  );
}
