//import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
const Appnav = () => {
  return (
    <Navbar bg="light" expand="lg" className="justify-content-around">
      <Nav>
        <Nav.Link href="info"> Estación</Nav.Link>
      </Nav>
      <Navbar.Brand href="/">Meteovereda</Navbar.Brand>
      <Nav>
        <Nav.Link href="historic"> Histórico</Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default Appnav;