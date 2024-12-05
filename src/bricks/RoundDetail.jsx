import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "react-bootstrap";
import DeleteModal from "./DeleteModal";

const RoundDetail = ({ round, project, users, generators, index }) => {
  const navigate = useNavigate();
  const { roundId } = useParams();
  const [isModalShown, setIsModalShown] = useState(false);
  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);

  const instructor = users.find((user) => user.id === project.instructor);

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <div style={{ display: "flex", gap: "10px", justifyContent: "right" }}>
        <Button size="sm" variant="outline-secondary" onClick={() => navigate(`/project/${project.id}`, { state: { project, instructor } })}>
          Back
        </Button>
      </div>
      <br />

      <h1> Round {index + 1}</h1>
      <h5>{project.name}</h5>
      <h6>{project.date}</h6>


      <br />

    </div>
  );
};

export default RoundDetail;
