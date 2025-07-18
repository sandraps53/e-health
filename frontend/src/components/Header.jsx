import React from 'react'
import { Button, Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  const logout=()=>{
    sessionStorage.clear()
    navigate('/');
  }
  return (
    <div>
      <Navbar className='bg-primary'>
        <Container>
          <Navbar.Brand>
            <Link to={'/'} style={{textDecoration:"none",color:"white"}}><i class="fa-solid fa-heart-pulse fa-beat me-3 fs-1 " ></i><span className='fs-3 text-bold fw-bolder'>eHealth</span></Link>
              
          </Navbar.Brand>
          <Button variant='secondary' onClick={logout}>Logout</Button>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header