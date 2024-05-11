import React, { createContext, useEffect, useState } from "react";

import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const username = JSON.parse(localStorage.getItem("username"));
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/users/${username}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.error(`Failed to fetch user:`, error));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
