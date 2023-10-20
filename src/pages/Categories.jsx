import React, { useEffect, useState } from "react";
import Base from "../components/Base";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import CategorySideMenu from "../components/CategorySideMenu";
import { doDeletePost, loadPostByCategory } from "../services/post-service";
import { toast } from "react-toastify";
import Post from "../components/Post";

const Categories = () => {
  const [posts, setPosts] = useState([]);
  const { categoryId } = useParams();
  useEffect(() => {
    console.log(categoryId);
    loadPostByCategory(categoryId)
      .then((data) => {
        console.log(data);
        setPosts([...data]);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading posts !!!");
      });
  }, [categoryId]);

  const deletePost = (post) => {
    doDeletePost(post.postId)
      .then((res) => {
        console.log(res);
        toast.success("Post is deleted...");

        let newPosts = posts.filter((p) => p.postId !== post.postId);
        setPosts([...newPosts]);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in deleting post !!!");
      });
  };

  return (
    <div>
      <Base>
        <Container className="mt-3 pt-3">
          <Row>
            <Col md={2}>
              <CategorySideMenu />
            </Col>
            <Col md={10}>
              <h1>Total blogs {posts.length}</h1>
              {posts &&
                posts.map((post, index) => {
                  return (
                    <Post post={post} key={index} deletePost={deletePost} />
                  );
                })}

              {posts.length <= 0 ? <h1>No Posts in this category</h1> : ""}
            </Col>
          </Row>
        </Container>
      </Base>
    </div>
  );
};

export default Categories;
