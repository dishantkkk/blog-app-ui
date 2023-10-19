import React, { useEffect, useRef, useState } from 'react'
import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  Input,
  Label,
} from 'reactstrap'
import { toast } from "react-toastify";
import JoditEditor from 'jodit-react'
import { loadAllCategories } from '../services/category-service'
import { createPost as doCreatePost, uploadPostImage } from '../services/post-service'
import { getCurrentUserDetail } from '../auth'
const AddPost = () => {
  //   const config = useMemo(
  //     {
  //       readonly: false, // all options from https://xdsoft.net/jodit/docs/,
  //       placeholder: placeholder || 'Start typings...',
  //     },
  //     [placeholder]
  //   )

  const [user, setUser] = useState(undefined)
  const editor = useRef(null)
  //   const [content, setContent] = useState('')

  const [image, setImage] = useState(null)
  const [post, setPost] = useState({
    title: '',
    content: '',
    categoryId: '',
  })
  const [categories, setCategories] = useState([])
  useEffect(() => {
    setUser(getCurrentUserDetail())
    loadAllCategories()
      .then((data) => {
        setCategories(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const fieldChanged = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    })
  }

  const contentFieldChanged = (data) => {
    setPost({ ...post, content: data })
  }

  const createPost = (e) => {
    e.preventDefault()
    if (post.title.trim() === '') {
      toast.error('Post title is required')
      return
    }
    if (post.content.trim() === '') {
      toast.error('Post content is required')
      return
    }
    if (post.categoryId === '') {
      toast.error('Select some category')
      return
    }
    post['userId'] = user.id
    doCreatePost(post)
      .then((data) => {
        uploadPostImage(image, data.postId).then(data => {
          toast.success("Image Uploaded")
        }).catch(error => {
          toast.error("Error in uploading image")
          console.log(error)
        })
        toast.success('Post created')
        setPost({
          title: '',
          content: '',
          categoryId: ''
        })
      })
      .catch((error) => {
        console.log(error);
        toast.error('Post not created due to some error !!!')
      })
  }
  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0])
  }
  return (
    <div className="wrapper">
      <Card className="shadow mt-3">
        <CardBody>
          <h3> what's going on in your mind?</h3>
          <Form onSubmit={createPost}>
            <div className="my-3">
              <Label for="title">Post Title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter here..."
                className="rounded-0"
                name="title"
                onChange={fieldChanged}
              />
            </div>
            <div className="my-3">
              <Label for="content">Post Content</Label>
              {/* <Input
                type="textarea"
                id="content"
                placeholder="Enter here..."
                className="rounded-0"
                style={{ height: '200px' }}
              /> */}
              <JoditEditor
                ref={editor}
                value={post.content}
                // config={config}
                onChange={contentFieldChanged}
              />
            </div>
            <div className="mt-3">
              <Label for='image'>Select Post Banner</Label>
              <Input type='file' id='image' onChange={handleFileChange} />
            </div>
            <div className="my-3">
              <Label for="category">Post Category</Label>
              <Input
                type="select"
                id="category"
                placeholder="Enter here..."
                name="categoryId"
                onChange={fieldChanged}
                defaultValue={0}
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
                  )
                })}
              </Input>
            </div>
            <Container className="text-center">
              <Button color="primary" type="submit">
                Create Post
              </Button>
              <Button className="ms-3" color="danger">
                Reset Content
              </Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}

export default AddPost
