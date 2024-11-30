import React from "react";
import Tile from "./Card";

const ProjectCards = ({ projects, users }) => {

  return (

<div
      className="d-flex flex-wrap gap-3"
      style={{
        minHeight: "100vh", // To ensure that the container takes full height
        gap: "3px", // Smaller gap between cards
        padding: "7px", // Add padding to create space from screen edges
      }}
    >
      {/* Media query for small screens */}
      <div
        className="d-flex flex-wrap gap-3"
        style={{
          minHeight: "100vh", // To ensure that the container takes full height
        }}
      >
      {projects?.map((project) => (
        <Tile key={project.id} project={project} users={users} />
      ))}
    </div>

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