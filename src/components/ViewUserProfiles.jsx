import React, { useEffect, useState } from "react";
import Profile from "../assets/default-profile.jfif";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Container,
  Table,
} from "reactstrap";
import { getCurrentUserDetail, isLoggedIn } from "../auth";

const ViewUserProfiles = ({ user }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [login, setLogin] = useState(false);
  useEffect(() => {
    setCurrentUser(getCurrentUserDetail());
    setLogin(isLoggedIn());
  }, []);
  return (
    <Card className="mt-2 border-0 rounded-0 shadow-sm text-center">
      <CardBody>
        <h3 className="text-uppercase">User Information</h3>
        <Container className="text-center">
          <img
            src={user.image ? user.image : Profile}
            alt="profile"
            style={{ maxWidth: "150px", maxHeight: "150px" }}
            className="img-fluid rounder-circle"
          />
        </Container>
        <Table responsive striped hover bordered={true} className="mt-5">
          <thead>
            <tr>
              <td>USER ID</td>
              <td>{user?.id}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>USER NAME</td>
              <td>{user?.name}</td>
            </tr>
            <tr>
              <td>EMAIL</td>
              <td>{user?.email}</td>
            </tr>
            <tr>
              <td>ABOUT</td>
              <td>{user?.about}</td>
            </tr>
            <tr>
              <td>ROLE</td>
              <td>
                {user?.roles.map((role) => {
                  return <div key={role?.id}>{role.name}</div>;
                })}
              </td>
            </tr>
          </tbody>
        </Table>
        {currentUser ? (
          currentUser.id === user.id ? (
            <CardFooter className="text-center">
              <Button color="warning">Update Profile</Button>
            </CardFooter>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </CardBody>
    </Card>
  );
};

export default ViewUserProfiles;
