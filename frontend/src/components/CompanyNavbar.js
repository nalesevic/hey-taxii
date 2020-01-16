import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Form, Navbar, FormControl, Button } from 'react-bootstrap'
import logo from './../img/heytaxilogo.png';

const CompanyNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand><img
        src={logo}
        height={35}
        className="d-inline-block align-top"
      /></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="justify-content-end mr-auto" style={{ width: "100%" }} >
        <Nav.Link as={NavLink} activeStyle={{ color: '#ffff00' }} to='/company'>Home</Nav.Link>
        <Nav.Link as={NavLink} activeStyle={{ color: '#ffff00' }} to='/profile'>Profile</Nav.Link>
        <Nav.Link as={NavLink} activeStyle={{ color: '#ffff00' }} to='/drivers'>Drivers</Nav.Link>
        <Nav.Link as={NavLink} activeStyle={{ color: '#ffff00' }} to='/vehicles'>Vehicles</Nav.Link>
        <Nav.Link href='/logout'>Logout</Nav.Link>
      </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default CompanyNavbar