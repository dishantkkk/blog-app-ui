import React, { useEffect } from "react";
import userContext from "./userContext";
import { useState } from "react";
import { getCurrentUserDetail, isLoggedIn } from "../auth";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    data: {},
    login: false,
  });

  useEffect(() => {
    setUser({
      data: getCurrentUserDetail(),
      login: isLoggedIn(),
    });
  }, []);
  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
