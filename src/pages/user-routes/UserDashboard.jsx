import React, { useEffect, useState } from "react";
import Base from "../../components/Base";
import { Container } from "reactstrap";
import AddPost from "../../components/AddPost";
import { getCurrentUserDetail } from "../../auth";
import { doDeletePost, loadPostUserWise } from "../../services/post-service";
import { toast } from "react-toastify";
import Post from "../../components/Post";

const UserDashboard = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    console.log(getCurrentUserDetail());
    loadPostData();
  }, []);
  function loadPostData() {
    loadPostUserWise(getCurrentUserDetail().id)
      .then((data) => {
        console.log(data);
        setPosts([...data]);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading user posts !!!");
      });
  }
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
    <Base>
      <Container>
        <h1> Welcome to dashboard </h1>
        <AddPost />
        <h1 className="my-3">Posts Count: {posts.length}</h1>
        {posts.map((post, index) => {
          return <Post post={post} key={index} deletePost={deletePost} />;
        })}
      </Container>
    </Base>
  );
};

export default UserDashboard;
