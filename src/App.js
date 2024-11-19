import './App.css';
import React, { useContext } from "react";
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavDropdown, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import Icon from '@mdi/react'


function App() {

  return (
    <div className={`App`}>

      <Navbar
        fixed="top"
        expand={"sm"}
        className="mb-3"
        bg="dark"
        variant="dark"
      >
        <Container fluid>
          <Navbar.Brand>  W a t t s  U p  </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
          <Navbar.Offcanvas id={`offcanvasNavbar-expand-sm`}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                WattsUp
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3 d-flex align-items-center">

                <NavDropdown
                  title={"Unregistred"}
                  id={"nav-dropdown-dark"}
                  menuVariant={"dark"}
                >
                  <NavDropdown.Item>
                    Admin
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    User
                  </NavDropdown.Item>
                </NavDropdown>
                <span className='me-3'></span>

                <Button
                  variant={"outline-light"}
                  style={{ marginLeft: "30px" }}
                //onClick={() => changeUser(null)}
                >
                  Log out
                </Button>

              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      <Outlet />
    </div>
  );
}

export default App;