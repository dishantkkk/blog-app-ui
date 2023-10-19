import React from 'react'
import Base from '../components/Base'
import NewFeed from '../components/NewFeed'
import { Container } from 'reactstrap'

const Home = () => {
  return (
    <div>
      <Base>
        <Container className='mt-3'>
          <NewFeed />
        </Container>
      </Base>
    </div>
  )
}

export default Home
