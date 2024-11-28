import React from "react";

import Tile from "./Card";

import { Button, Form, Navbar } from "react-bootstrap";

const ProjectCards = ({ projects, users }) => {
  return (
    <div className="d-flex flex-wrap gap-3" style={{ marginLeft: "10px" }}>
      {projects?.map((project) => (
        <Tile key={project.id} project={project} users={users} />
      ))}
    </div>
  );
};

export default ProjectCards;
