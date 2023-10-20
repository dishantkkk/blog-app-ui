import React, { useEffect, useState } from "react";
import Base from "../../components/Base";
import { useContext } from "react";
import userContext from "../../context/userContext";
import { useParams } from "react-router-dom";
import { getUser } from "../../services/user-service";
import { Col, Row } from "reactstrap";
import ViewUserProfiles from "../../components/ViewUserProfiles";

const ProfileInfo = () => {
  const [user, setUser] = useState(null);
  const object = useContext(userContext);
  const { userId } = useParams();

  useEffect(() => {
    getUser(userId).then((data) => {
      console.log(data);
      setUser({ ...data });
    });
  }, []);

  const userView = () => {
    return (
      <Row>
        <Col md={{ size: 8, offset: 2 }}>
          <ViewUserProfiles user={user} />
        </Col>
      </Row>
    );
  };

  return <Base>{user ? userView() : ""}</Base>;
};

export default ProfileInfo;
