import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button, Toast } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import ProjectModal from "./OverviewInterface/ProjectModal";
import DeleteModal from "./DeleteModal";
import { mdiDelete, mdiKeyboardBackspace, mdiPencil } from "@mdi/js";
import Icon from "@mdi/react";
import { useData } from "../DataProvider";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

<<<<<<< HEAD
const ProjectDetail = ({ project, generators, rounds, energy }) => {
=======
const ProjectDetail = ({ project, instructor, generators, rounds, energy, users }) => {
>>>>>>> ac6437dca39c7962df4e1143ae1578000e5e68d8
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [isModalShown, setIsModalShown] = useState(false);
  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);
  const [isUpdatedToastShown, setIsUpdatedToastShown] = useState(false);
  const [currentProject, setCurrentProject] = useState(project);
  const createdBy = users.find((user) => user.id === currentProject.createdBy);

  const { users } = useData();

  const handleProjectUpdate = (updatedProject) => {
    setCurrentProject(updatedProject);
  };

  const filteredRounds = rounds.filter(
    (round) => round.projectId === project.id
  );
  const filteredGenerators = generators.filter((generator) =>
    currentProject.generatorList.includes(generator.id)
  );

  // Funkcia na filtrovanie energie podľa kôl
  const getEnergyForRound = (roundId) => {
    return energy.filter((entry) => entry.roundId === roundId);
  };

  // Funkcia na prípravu dát pre Bar chart
  const prepareChartData = (roundId) => {
    const roundEnergy = getEnergyForRound(roundId);

    const labels = filteredGenerators.map((generator) => generator.name);
    const data = filteredGenerators.map((generator) => {
      const energyEntry = roundEnergy.find(
        (entry) => entry.generatorId === generator.id
      );
      return energyEntry ? energyEntry.totalEnergy : 0; // Ak nie je energia, nastavíme 0
    });

    return {
      labels: labels,
      datasets: [
        {
          label: "Total Energy",
          data: data,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "0.85rem",
          marginBottom: "10px",
        }}
      >
        <p>Organization: {currentProject.organization}</p>
        <p>Created by: {createdBy ? createdBy.name : "Unknown"}</p>
        <p>Creation date: {currentProject.creationDate}</p>
      </div>
  
      <div 
        style={{
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: 0 }}>{currentProject.name}</h1>
          <h4 style={{ margin: 0 }}>{currentProject.date}</h4>
        </div>
  
        <div 
          style={{ 
            display: "flex", 
            gap: "5px",
            height: "35px",
          }}
        >
          <Button
            variant="outline-info"
            size="sm"
            onClick={() => setIsModalShown(true)}
          >
            <Icon path={mdiPencil} size={1} />
          </Button>
          <Button
            size="sm"
            variant="outline-danger"
            onClick={() => setIsDeleteModalShown(true)}
          >
            <Icon path={mdiDelete} size={1} />
          </Button>
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={() => navigate("/overview")}
          >
            <Icon path={mdiKeyboardBackspace} size={1} />
          </Button>
        </div>
      </div>
    </div>
      <br />

      <div style={{ textAlign: "left" }}>
        <p>
          <b>Description: </b>
          {currentProject.description}
        </p>
        <p>
          <b>Instructor: </b>
          {currentProject.instructor.name}
        </p>
        <p>
          <b>Count of students: </b>
          {currentProject.studentCount}
        </p>
        <p>
          <b>Generators: </b>
          {filteredGenerators.map((generator) => generator.name).join(", ")}
        </p>
        <p>
          <b>Round duration: </b>
          {currentProject.roundDuration}
        </p>
        <h5>Rounds:</h5>
        <br />
        {filteredRounds.length > 0 ? (
          filteredRounds.map((round, index) => (
            <div key={round.id}>
              <p
                key={round.id}
                onClick={() =>
                  navigate(`/round/${round.id}`, {
                    state: { project, filteredGenerators, round, index },
                  })
                }
                style={{ cursor: "pointer" }}
              >
                <strong> Round {index + 1} </strong>
              </p>
              {/* Stĺpcový graf pre každé kolo */}
              <div style={{ height: "400px" }}>
                <Bar data={prepareChartData(round.id)} />
              </div>
            </div>
          ))
        ) : (
          <p>No rounds available for this project.</p>
        )}
      </div>

      <ProjectModal
        setIsModalShown={setIsModalShown}
        isModalShown={isModalShown}
        incomingFormData={currentProject}
        version="edit"
        onUpdate={handleProjectUpdate}
        setIsUpdatedToastShown={setIsUpdatedToastShown}
      />

      <DeleteModal
        project={currentProject}
        isShown={isDeleteModalShown}
        setIsShown={setIsDeleteModalShown}
      />

      <Toast
        style={{
          position: "fixed",
          top: "10px", // Nastaví horní odsazení
          right: "10px", // Nastaví pravé odsazení
          zIndex: 1050,
        }}
        bg="success"
        show={isUpdatedToastShown}
        onClose={() => setIsUpdatedToastShown(false)}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">Edited!</strong>
        </Toast.Header>
        <Toast.Body>
          <strong>The project was successfully edited</strong>
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default ProjectDetail;
