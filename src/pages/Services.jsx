import Base from "../components/Base";
import userContext from "../context/userContext";

const Services = () => {
  return (
    <userContext.Consumer>
      {(object) => (
        <Base>
          <h1>This is services page</h1>
          <h1>Welcome {object.user.login && object.user.data.user.name}</h1>
        </Base>
      )}
    </userContext.Consumer>
  );
};

export default Services;
