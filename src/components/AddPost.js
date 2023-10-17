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
import JoditEditor from 'jodit-react'
import { loadAllCategories } from '../services/category-service'

const AddPost = () => {
  const config = {
    placeholder: 'Start typing ...',
  }
  const editor = useRef(null)
  const [content, setContent] = useState('')

  const [categories, setCategories] = useState([])
  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        console.log(data)
        setCategories(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  return (
    <div className="wrapper">
      <Card className="shadow mt-3">
        <CardBody>
          <h3> what's going on in your mind?</h3>
          <Form>
            <div className="my-3">
              <Label for="title">Post Title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter here..."
                className="rounded-0"
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
                value={content}
                config={config}
                onChange={(newContent) => setContent(newContent)}
              />
            </div>
            <div className="my-3">
              <Label for="category">Post Category</Label>
              <Input type="select" id="category" placeholder="Enter here...">
                {categories.map((category) => {
                  return (
                    <option
                      key={category.categoryId}
                      value={category.categoryId}
                    >
                      {category.categoryName}
                    </option>
                  )
                })}
              </Input>
            </div>
            <Container className="text-center">
              <Button color="primary">Create Post</Button>
              <Button className="ms-3" color="danger">
                Reset Content
              </Button>
            </Container>
          </Form>
          {content}
        </CardBody>
      </Card>
    </div>
  )
}

export default AddPost
