import React from "react";
import Tile from "./Card";

const ProjectCards = () => {
  const projects = [
    {
      id: 1,
      name: "Project Alpha",
      createdBy: "Janko Hraško",
      date: "2024-11-21",
    },
    {
      id: 2,
      name: "Project Beta",
      createdBy: "Eva Nováková",
      date: "2024-12-01",
    },
    {
      id: 3,
      name: "Project Gamma",
      createdBy: "Peter Sagan",
      date: "2025-01-15",
    },
  ];

  return (
    <div className="d-flex flex-wrap gap-3">
      {projects.map((project) => (
        <Tile key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectCards;
