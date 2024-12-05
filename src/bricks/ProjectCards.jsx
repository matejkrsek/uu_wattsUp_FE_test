import React from "react";
import Tile from "./Card";

const ProjectCards = ({ projects, users, generators }) => {
  return (
    <div
      className="d-flex flex-wrap gap-3"
      style={{
        minHeight: "100vh",
        padding: "7px",
      }}
    >
      {projects?.map((project) => (
        <Tile key={project.id} project={project} users={users} generators={generators} />
      ))}

      <style>
        {`
          @media (max-width: 570px) {
            .d-flex {
              justify-content: center;
              align-items: center;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ProjectCards;