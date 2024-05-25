import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const ComicsContext = createContext();

export const ComicsProvider = ({ children }) => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/mangas`)
      .then((response) => {
        setComics(response.data);
        sortByUploadDate();
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Error fetching data:`, error);
        setLoading(false);
      });
  }, []);

  function sortByUploadDate() {
    setComics((prevComics) => {
      return prevComics.sort((a, b) => {
        if (a.chapters.length > 0 && b.chapters.length > 0) {
          const dateA = new Date(a.chapters[a.chapters.length - 1].uploadDate);
          const dateB = new Date(b.chapters[b.chapters.length - 1].uploadDate);
          return dateB - dateA;
        } else if (a.chapters.length === 0 && b.chapters.length > 0) {
          return 1;
        } else if (a.chapters.length > 0 && b.chapters.length === 0) {
          return -1;
        } else {
          return 0;
        }
      });
    });
  }

  // Prevent loading when comics
  // are still being fetched.
  if (loading) {
    return <></>;
  }

  return (
    <ComicsContext.Provider value={{ comics, setComics }}>
      {children}
    </ComicsContext.Provider>
  );
};

export default ComicsContext;
