import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    // Fetch users only if not already loaded
    if (!dataLoaded) {
      axios
        .get(`/api/user/${"udk"}`)
        .then((response) => {
          setUser(response.data);
          setDataLoaded(true);
        })
        .catch((error) => {
          console.error(`Error fetching user data:`, error);
        });
    }
  }, [dataLoaded]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {dataLoaded ? children : null}
    </UserContext.Provider>
  );
};

export default UserContext;
