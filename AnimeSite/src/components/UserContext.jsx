import React, { createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const logged = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(logged ?? []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
