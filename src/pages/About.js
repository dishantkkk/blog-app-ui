import React from 'react'
import Base from '../components/Base'
import userContext from '../context/userContext'

const About = () => {
  return (
    <div>
      <userContext.Consumer>
        {
          (user) => (
            <Base>
              <h1>This is About page</h1>
              <p>we are building blog website</p>
              <h1>Welcome {user.name}</h1>
            </Base>
          )
        }
      </userContext.Consumer>
    </div>
  )
}

export default About
