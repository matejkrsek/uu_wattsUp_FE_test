import "./App.css";
import "./output.css";

import React, { useState, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import Icon from "@mdi/react";
import { mdiCogOutline } from "@mdi/js";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

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
          <Navbar.Brand
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            W a t t s U p
          </Navbar.Brand>{" "}
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
          <Navbar.Offcanvas id={`offcanvasNavbar-expand-sm`}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                WattsUp
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3 d-flex align-items-center">
                <span className="me-3"></span>

                <Icon
                  path={mdiCogOutline}
                  size={1.2}
                  color="white"
                  onClick={() => navigate("/settings")}
                  style={{ cursor: "pointer" }}
                />

                <Button
                  variant={"outline-light"}
                  style={{ marginLeft: "30px" }}
                  onClick={user ? handleLogout : handleLogin}
                >
                  {user ? "Logout" : "Login"}
                </Button>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <br></br>

      <Outlet />
    </div>
  );
}

export default App;
