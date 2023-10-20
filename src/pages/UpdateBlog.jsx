import React, { useContext, useEffect, useRef, useState } from "react";
import Base from "../components/Base";
import { useNavigate, useParams } from "react-router-dom";
import userContext from "../context/userContext";
import { doUpdatePost, loadPost } from "../services/post-service";
import { toast } from "react-toastify";
import { loadAllCategories } from "../services/category-service";
import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  Input,
  Label,
} from "reactstrap";
import JoditEditor from "jodit-react";

const UpdateBlog = () => {
  const editor = useRef(null);

  const [categories, setCategories] = useState([]);

  const { blogId } = useParams();
  const userContextData = useContext(userContext);
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });

    loadPost(blogId)
      .then((data) => {
        setPost({ ...data, categoryId: data.category.categoryId });
        console.log(post);
      })
      .catch((error) => {
        console.log(error);
        toast.error("error in loading blog post !!!");
      });
  }, []);
  useEffect(() => {
    if (post) {
      console.log(userContextData);
      if (post.user.id !== userContextData.user.data.id) {
        toast.error("This is not your post !!!");
        navigate("/");
      }
    }
  }, [post]);

  const handleChange = (event, fieldName) => {
    setPost({
      ...post,
      [fieldName]: event.target.value,
    });
  };
  const updatePost = (e) => {
    e.preventDefault();
    doUpdatePost(
      { ...post, category: { categoryId: post.categoryId } },
      post.postId
    )
      .then((response) => {
        console.log(response);
        toast.success("Post Updated");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in updating post !!!");
      });
  };
  const updateHtml = () => {
    return (
      <div className="wrapper">
        <Card className="shadow mt-3">
          <CardBody>
            <h3>Update post here !</h3>
            <Form onSubmit={updatePost}>
              <div className="my-3">
                <Label for="title">Post Title</Label>
                <Input
                  type="text"
                  id="title"
                  placeholder="Enter here..."
                  className="rounded-0"
                  name="title"
                  value={post.title}
                  onChange={(event) => handleChange(event, "title")}
                />
              </div>
              <div className="my-3">
                <Label for="content">Post Content</Label>
                <JoditEditor
                  ref={editor}
                  value={post.content}
                  // config={config}
                  onChange={(newContent) =>
                    setPost({ ...post, content: newContent })
                  }
                />
              </div>
              <div className="mt-3">
                <Label for="image">Select Post Banner</Label>
                <Input type="file" id="image" />
              </div>
              <div className="my-3">
                <Label for="category">Post Category</Label>
                <Input
                  type="select"
                  id="category"
                  placeholder="Enter here..."
                  name="categoryId"
                  onChange={(event) => handleChange(event, "categoryId")}
                  value={post.categoryId}
                >
                  <option disabled value={0}>
                    --Select Category--
                  </option>
                  {categories.map((category) => {
                    return (
                      <option
                        key={category.categoryId}
                        value={category.categoryId}
                      >
                        {category.categoryTitle}
                      </option>
                    );
                  })}
                </Input>
              </div>
              <Container className="text-center">
                <Button color="primary" type="submit">
                  Update Post
                </Button>
                <Button className="ms-3" color="danger">
                  Reset Content
                </Button>
              </Container>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  };
  return (
    <Base>
      <Container>{post && updateHtml()}</Container>
    </Base>
  );
};

export default UpdateBlog;
