import React, { useState } from 'react'
import Base from '../components/Base'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap'
import { Form, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginUser } from '../services/user-service'
import { doLogin } from '../auth'

const Login = () => {
  const navigate = useNavigate()
  const [loginDetail, setLoginDetail] = useState({
    username: '',
    password: '',
  })

  const handleChange = (e, field) => {
    let actualValue = e.target.value
    setLoginDetail({
      ...loginDetail,
      [field]: actualValue,
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (
      loginDetail.username.trim() === '' ||
      loginDetail.password.trim() === ''
    ) {
      toast.error('username or password is required')
      return
    }
    loginUser(loginDetail)
      .then((data) => {
        console.log(data)
        doLogin(data, () => {
          console.log('details saved to localStorage')
          navigate('/user/dashboard')
        })
        toast.success('Login success!')
      })
      .catch((error) => {
        console.log(error)
        if (error.response.status === 400 || error.response.status === 404) {
          toast.error(error.response.data.message)
        } else {
          toast.error('Something went wrong  on sever !!')
        }
      })
  }

  return (
    <Base>
      <Container>
        <Row className="mt-3">
          <Col sm={{ size: 10, offset: 1 }}>
            <Card color="dark" outline>
              <CardHeader>
                <h3>Login Here</h3>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleFormSubmit}>
                  <FormGroup>
                    <Label for="name">Enter Your Email</Label>
                    <Input
                      type="email"
                      placeholder="Enter email here"
                      id="email"
                      value={loginDetail.username}
                      onChange={(e) => handleChange(e, 'username')}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="name">Enter Your Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter password here"
                      id="password"
                      value={loginDetail.password}
                      onChange={(e) => handleChange(e, 'password')}
                    />
                  </FormGroup>
                  <Container className="text-center">
                    <Button outline color="dark">
                      Login
                    </Button>
                    <Button
                      outline
                      color="dark"
                      type="reset"
                      className="ms-2"
                      onClick={() =>
                        setLoginDetail({
                          username: '',
                          password: '',
                        })
                      }
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

export default Login
