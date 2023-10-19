import React from "react";
import Base from "../components/Base";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardText,
  Col,
  Container,
  Input,
  Row,
} from "reactstrap";
import { useEffect } from "react";
import { createComment, loadPost } from "../services/post-service";
import { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../services/helper";
import { isLoggedIn } from "../auth";

const PostPage = () => {
  const [comment, setComment] = useState({
    content: "",
  });
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  useEffect(() => {
    loadPost(postId)
      .then((data) => {
        console.log(data);
        setPost(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading post !!!");
      });
  }, []);

  const submitPostComment = () => {
    console.log(isLoggedIn());
    if (!isLoggedIn()) {
      console.log("error");
      toast.error("You need to login first to comment on the post !!!");
      return;
    }
    if (comment.content.trim() === "") {
      return;
    }
    createComment(comment, post.postId)
      .then((data) => {
        console.log(data);
        toast.success("comment added");
        setPost({
          ...post,
          comments: [...post.comments, data.data],
        });
        setComment({
          content: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Base>
      <Container className="mt-4">
        <Link to="/">Home</Link> / {post && <Link to="">{post.title}</Link>}
        <Row>
          <Col md={{ size: 12 }}>
            <Card className="mt-3 container text-center ps-3 border-0 shadow-sm">
              {post && (
                <CardBody>
                  <CardText>
                    Posted by <b>{post?.user?.name}</b> on{" "}
                    <b>{new Date(post?.addedDate).toString()}</b>
                  </CardText>
                  <CardText className="text-muted">
                    {post.category.categoryTitle}
                  </CardText>
                  <div
                    className="divider"
                    style={{
                      width: "100%",
                      height: "1px",
                      background: "#e2e2e2",
                    }}
                  ></div>
                  <CardText className="mt-4 h1">{post.title}</CardText>
                  <div
                    className="image-container mt-3 container"
                    style={{ maxWidth: "50%" }}
                  >
                    <img
                      className="img-fluid"
                      src={BASE_URL + "/post/image/" + post.imageName}
                      alt=""
                    />
                  </div>
                  <CardText
                    className="mt-5"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </CardBody>
              )}
            </Card>
          </Col>
        </Row>
        <Row className="my-4">
          <Col
            md={{
              size: 9,
              offset: 1,
            }}
          >
            <h3>Comments ({post ? post.comments.length : ""})</h3>
            {post &&
              post.comments.map((comment, index) => (
                <Card className="mt-4 corder-0" key={index}>
                  <CardBody>
                    <CardText>{comment.content}</CardText>
                  </CardBody>
                </Card>
              ))}
            <Card className="mt-4 border-0">
              <CardBody>
                <Input
                  type="textarea"
                  placeholder="Enter comment here"
                  onChange={(event) =>
                    setComment({ content: event.target.value })
                  }
                  value={comment.content}
                />
                <Button
                  onClick={submitPostComment}
                  className="mt-2"
                  color="primary"
                >
                  Submit
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default PostPage;
