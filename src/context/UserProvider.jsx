import React, { useEffect } from "react";
import userContext from "./userContext";
import { useState } from "react";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "Dishant",
  });

  useEffect(() => {
    setUser({
      name: "Deepu",
    });
  });

  return <userContext.Provider value={user}>{children}</userContext.Provider>;
};

export default UserProvider;
