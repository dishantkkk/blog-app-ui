import React, { useState } from 'react'
import Base from '../components/Base'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap'
import { Form } from 'react-router-dom'
import { signup } from '../services/user-service'
import { toast } from 'react-toastify'

const Signup = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    about: '',
  })
  const [error, setError] = useState({
    errors: {},
    isError: false,
  })
  //   useEffect(() => {
  //     console.log(data)
  //   }, [data])
  const handleChange = (e, property) => {
    setData({ ...data, [property]: e.target.value })
  }
  const submitForm = (e) => {
    e.preventDefault()

    // if (error.isError) {
    //   toast.error('Form data is invalid, correct the details and submit !!')
    //   setError({
    //     ...error,
    //     isError: false,
    //   })
    //   return
    // }
    console.log(data)
    signup(data)
      .then((resp) => {
        console.log('success log ' + resp)
        toast.success('User is registered successfully!! user id ' + resp.id)
        setData({
          name: '',
          email: '',
          password: '',
          about: '',
        })
      })
      .catch((error) => {
        console.log('error log ' + error)
        setError({
          errors: error,
          isError: true,
        })
      })
  }
  return (
    <Base>
      <Container>
        <Row className="mt-3">
          <Col sm={{ size: 10, offset: 1 }}>
            <Card color="dark" outline>
              <CardHeader>
                <h3>Fill Information to register</h3>
              </CardHeader>
              <CardBody>
                <Form onSubmit={submitForm}>
                  <FormGroup>
                    <Label for="name">Enter Your Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter name here"
                      id="name"
                      onChange={(e) => handleChange(e, 'name')}
                      value={data.name}
                      invalid={
                        error.errors?.response?.data?.name ? true : false
                      }
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.name}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="name">Enter Your Email</Label>
                    <Input
                      type="email"
                      placeholder="Enter email here"
                      id="email"
                      onChange={(e) => handleChange(e, 'email')}
                      value={data.email}
                      invalid={
                        error.errors?.response?.data?.email ? true : false
                      }
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.email}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Enter Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter password here"
                      id="password"
                      onChange={(e) => handleChange(e, 'password')}
                      value={data.password}
                      invalid={
                        error.errors?.response?.data?.password ? true : false
                      }
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.password}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="about">About</Label>
                    <Input
                      type="textarea"
                      id="about"
                      style={{ height: '100px' }}
                      onChange={(e) => handleChange(e, 'about')}
                      value={data.about}
                      invalid={
                        error.errors?.response?.data?.about ? true : false
                      }
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.about}
                    </FormFeedback>
                  </FormGroup>
                  <Container className="text-center">
                    <Button outline color="dark">
                      Register
                    </Button>
                    <Button
                      outline
                      color="dark"
                      type="reset"
                      onClick={() =>
                        setData({
                          name: '',
                          email: '',
                          password: '',
                          about: '',
                        })
                      }
                      className="ms-2"
                    >
                      Reset
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  )
}

export default Signup
