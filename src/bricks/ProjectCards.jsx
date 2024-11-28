import React from "react";

import Tile from "./Card";

import { Button, Form, Navbar } from "react-bootstrap";


const ProjectCards = ({ projects, users }) => {

  //  console.log(projects);

  return (
    <div>
      <Navbar bg= "light" collapseOnSelect expand="sm">
        <div className="container-fluid">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse style={{ justifyContent: "flex-end" }}>
            <Button
              style={{ marginRight: "8px" }}
              variant={"success"}
              type="submit"
              size="sm"
            >
              + Project
            </Button>
          </Navbar.Collapse>
        </div>
      </Navbar>
      <br />

      <div className="d-flex flex-wrap gap-3" style={{marginLeft:"10px"}}>
        {projects?.map((project) => (
          <Tile key={project.id} project={project} users={users} />
        ))}
      </div>
    </div>
  );
};

export default ProjectCards;