import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "react-bootstrap";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProjectDetail = ({ project, instructor, generators, rounds, energy }) => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [isModalShown, setIsModalShown] = useState(false);
  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);

  const filteredRounds = rounds.filter(
    (round) => round.projectId === project.id
  );
  const filteredGenerators = generators.filter((generator) =>
    project.generatorList.includes(generator.id)
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
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "space-between",
        }}
      >
        <div></div>
        <div>
          <h1>{project.name}</h1>
          <h4>{project.date}</h4>
        </div>
        <div
          style={{
            height: "35px",
            display: "flex",
            marginLeft: "50px",
            gap: "5px",
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
      <br />

      <div style={{ textAlign: "left" }}>
        <p>
          <b>Organization: </b>
          {project.organization}
        </p>
        <p>
          <b>Instructor: </b>
          {instructor.name}
        </p>
        <p>
          <b>Count of students: </b>
          {project.studentCount}
        </p>
        <p>
          <b>Generators: </b>
          {filteredGenerators.map((generator) => generator.name).join(", ")}
        </p>
        <br />

        <h5>Rounds:</h5>
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
                style={{ cursor: "pointer", color: "darkred" }}
              >
                Round {index + 1}
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
        setIsNewModalShown={setIsModalShown}
        isNewModalShown={isModalShown}
        incomingFormData={project}
        incomingVersion="edit"
      />

      <DeleteModal
        project={project}
        isShown={isDeleteModalShown}
        setIsShown={setIsDeleteModalShown}
      />
    </div>
  );
};

export default ProjectDetail;
