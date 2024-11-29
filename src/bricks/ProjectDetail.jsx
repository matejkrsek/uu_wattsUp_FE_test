import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { loadProjects } from "../calls"; // Import API funkce (mock nebo real)
import { Button } from "react-bootstrap";
import ProjectModal from "./OverviewInterface/ProjectModal";

const ProjectDetail = () => {
  const { projectId } = useParams(); // Získání ID z URL
  const [project, setProject] = useState({
    id: "",
    name: "",
    date: "2032-41-5", // FIX ME
    organization: "",
    description: "",
    createdBy: "",
    student: "",
    rounds: "",
    generatorList: ["a", "b"], // Array to store selected generator IDs
    status: true,
  }); // Stav pro uložení dat projektu
  const [loading, setLoading] = useState(true); // Stav pro načítání
  const [error, setError] = useState(null); // Stav pro chybu

  const [isModalShown, setIsModalShown] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const projects = await loadProjects(); // Zavolání funkce pro načtení projektů
        const foundProject = projects.find(
          (p) => p.id.toString() === projectId
        ); // Najde projekt podle ID
        if (!foundProject) throw new Error("Project not found");
        setProject(foundProject);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId, project]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{project.name}</h1>
      <Button onClick={() => setIsModalShown(true)}>Edit</Button>
      <p>
        <strong>Created by:</strong> {project.createdBy}
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
