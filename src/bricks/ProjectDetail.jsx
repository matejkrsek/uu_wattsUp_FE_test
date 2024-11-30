import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "react-bootstrap";
import ProjectModal from "./OverviewInterface/ProjectModal";
import { useProject } from "../ProjectProvider";

const ProjectDetail = ({ project, createdByUser }) => {
  const navigate = useNavigate();
  const { projectId } = useParams(); // Get projectId from URL
  //const { fetchProject, projects, status } = useProject(); // Access context values
  //const [project, setProject] = useState(null); // State for selected project
  const [isModalShown, setIsModalShown] = useState(false);

  /*   useEffect(() => {
      // Ensure projects are loaded
      if (status.state === "pending") {
        fetchProject();
      } else {
        const foundProject = projects.find((p) => p.id.toString() === projectId);
        setProject(foundProject || null);
      }
    }, [projectId, projects, fetchProject, status.state]); 
  
    if (status.state === "pending") return <div>Loading...</div>;
    if (status.state === "error") return <div>Error loading projects.</div>;
    if (!project) return <div>Project not found.</div>;*/

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", alignItems: "center", justifyContent: "center" }}>
        <Button onClick={() => setIsModalShown(true)}>Edit</Button>
        <Button variant= "outline-secondary" onClick={() => navigate("/")}>Back</Button>
      </div>
      <br />
      <h1>{project.name}</h1>
      <br />
      <p>
        <strong>Created by:</strong> {createdByUser.name}
      </p>
      <p>
        <strong>Event Date:</strong> {project.date}
      </p>
      <p>
        <strong>Organization:</strong> {project.organization}
      </p>

      <ProjectModal
        setIsNewModalShown={setIsModalShown}
        isNewModalShown={isModalShown}
        incomingFormData={project}
        incomingVersion="edit"
      />
    </div>
  );
};

export default ProjectDetail;