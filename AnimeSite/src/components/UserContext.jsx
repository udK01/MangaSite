import React, { createContext, useEffect, useState } from "react";
import LoginOverlay from "./LoginOverlay";

import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const username = JSON.parse(localStorage.getItem("username"));
  const [loginRequest, setLoginRequest] = useState(false);
  const [user, setUser] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    username &&
      axios
        .get(`/api/users/${username}`)
        .then((response) => setUser(response.data))
        .catch((error) => console.error(`Failed to fetch user:`, error));

    axios
      .get(`/api/users`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(`Failed to fetch users:`, error));
  }, []);

  const closeLoginOverlay = () => {
    setLoginRequest(false);
  };

  return (
    <UserContext.Provider value={{ user, setUser, users, setLoginRequest }}>
      {children}
      {loginRequest && <LoginOverlay onClose={closeLoginOverlay} />}
    </UserContext.Provider>
  );
};

export default UserContext;
