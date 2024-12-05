import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Card, Button } from "react-bootstrap";

function Tile({ project, users }) {
  const navigate = useNavigate();
  const createdByUser = users.find((user) => user.id === project.createdBy);

  return (
    <div>
      {" "}
      <Card
        style={{
          cursor: "pointer",
          width: "270px",
          height: "330px",
          overflow: "hidden", // Hide overflow if content exceeds
        }}
        onClick={() => navigate(`/project/${project.id}`, { state: { project, createdByUser } })}
      >
        <Card.Body
          style={{
            display: "flex", // Enable flexbox
            flexDirection: "column", // Align text vertically
            justifyContent: "center", // Horizontally center the content
            alignItems: "center", // Vertically center the content
            textAlign: "center", // Align text in the center
          }}
        >
          <strong style={{ fontSize: "20px", marginBottom: "13px" }}> {project.name} </strong>
          <u>{"Created by:"}</u>
          <div style={{ marginBottom: "7px" }}>
            {createdByUser ? createdByUser.name : "Unknown"}
          </div>
          <u>{"Event date:"}</u>
          <div style={{ marginBottom: "7px" }}>
            {format(new Date(project.date), "dd.MM.yyyy")}
          </div>
          <u>{"Organization:"}</u>
          {project.organization}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Tile;