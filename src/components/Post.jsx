import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardText } from "reactstrap";
import { getCurrentUserDetail } from "../auth";
import userContext from "../context/userContext";

const Post = ({
  post = {
    title: "This is default post title",
    content: "This is default post content",
  },
  deletePost,
}) => {
  const userContextData = useContext(userContext);
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(getCurrentUserDetail());
  }, []);
  return (
    <Card className="border-0 shadow-sm mt-3">
      <CardBody>
        <h3>{post.title}</h3>
        <CardText
          dangerouslySetInnerHTML={{
            __html: post.content.substring(0, 100) + ".....",
          }}
        />
        <div>
          <Link className="btn btn-secondary" to={"/posts/" + post.postId}>
            Read more ...
          </Link>
          {userContextData.user.login &&
            (user && user.id === post.user.id ? (
              <Button
                onClick={() => deletePost(post)}
                color="danger"
                className="ms-2"
              >
                Delete
              </Button>
            ) : (
              ""
            ))}
          {userContextData.user.login &&
            (user && user.id === post.user.id ? (
              <Button
                tag={Link}
                to={`/user/update-blog/${post.postId}`}
                color="warning"
                className="ms-2"
              >
                Update
              </Button>
            ) : (
              ""
            ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default Post;
