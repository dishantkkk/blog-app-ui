import React from "react";
import Base from "../../components/Base";
import { useContext } from "react";
import userContext from "../../context/userContext";

const ProfileInfo = () => {
  const user = useContext(userContext);
  return (
    <Base>
      <h1>Profile Info</h1>
      <h1>Welcome {user.name}</h1>
    </Base>
  );
};

export default ProfileInfo;
