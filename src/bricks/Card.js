import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import Icon from "@mdi/react";

function Tile({ project, users }) {
  const navigate = useNavigate();
  const createdByUser = users.find(user => user.id === project.createdBy);

  /*   const handleCardClick = () => {
        navigate(`/project/${detail.id}`, {state: {detail, ownerName, members}});
      }; */

  return (
    <Card  style={{ cursor: "pointer" }} onClick={() => navigate(`/project/${project.id}`)}> 

      <Card.Body>
        <strong> {project.name} </strong> <br /> <br />
        <div style={{ textAlign: "left" }}>
          <u>{"Created by:"}:</u> {createdByUser ? createdByUser.name : "Unknown"}
          <br />
          <u>{"Event date:"}:</u> {project.date}
          <br />
          <u>{"School:"}:</u> {project.school}
        </div>
        <br />
      </Card.Body>
    </Card>
  );
}

export default Tile;
