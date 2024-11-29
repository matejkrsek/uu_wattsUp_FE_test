import React from "react";
import Tile from "./Card";

const ProjectCards = ({ projects, users }) => {
  //  console.log(projects);

  return (
    <div className="d-flex flex-wrap gap-3">
      {projects?.map((project) => (
        <Tile key={project.id} project={project} users={users} />
      ))}
    </div>
  );
};

export default ProjectCards;
