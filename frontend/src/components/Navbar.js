import React from 'react';
import { Navbar as BSNavbar, Nav, Container } from 'react-bootstrap';

const Navbar = ({ setPage }) => {
  return (
    <BSNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <BSNavbar.Brand href="#">e-Government</BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" onClick={() => setPage('home')}>Home</Nav.Link>
            <Nav.Link href="#" onClick={() => setPage('birth')}>Birth Registration</Nav.Link>
            <Nav.Link href="#" onClick={() => setPage('death')}>Death Registration</Nav.Link>
            <Nav.Link href="#" onClick={() => setPage('marriage')}>Marriage Registration</Nav.Link>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}

export default Navbar;
