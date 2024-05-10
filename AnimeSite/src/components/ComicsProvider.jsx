import React, { createContext, useEffect, useState } from "react";

import axios from "axios";

const ComicsContext = createContext();

export const ComicsProvider = ({ children }) => {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/mangas`)
      .then((response) => {
        setComics(response.data);
        console.log(`Ran`);
      })
      .catch((error) => {
        console.error(`Error fetching data:`, error);
      });
  }, []);

  return (
    <ComicsContext.Provider value={{ comics }}>
      {children}
    </ComicsContext.Provider>
  );
};

export default ComicsContext;
