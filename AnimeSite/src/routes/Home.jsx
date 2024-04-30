import { Navbar, Hero, Footer } from "../components";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export default function Home({
  comics,
  setComics,
  view,
  mangaID,
  chapterNumber,
}) {
  const location = useLocation();
  const currentPath = location.pathname;

  // Helps ensure changes remain if users,
  // change view then return to it.
  useEffect(() => {
    axios
      .get(`/api/mangas`)
      .then((response) => setComics(response.data))
      .catch((error) => console.error(`Error fetching data:`, error));
  }, [currentPath]);

  return (
    <section className="h-full bg-secondary flex flex-col items-center">
      <Navbar comics={comics} />
      <Hero
        comics={comics}
        view={view}
        mangaID={mangaID}
        chapterNumber={chapterNumber}
      />
      <Footer />
    </section>
  );
}
