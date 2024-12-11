import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "react-bootstrap";
import DeleteModal from "./DeleteModal";
import ReactSpeedometer from "react-d3-speedometer";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const RoundDetail = ({ round, project, users, generators, index }) => {
  const navigate = useNavigate();
  const { roundId } = useParams();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: generators.map((generator) => ({
      label: generator.name,
      data: [],
      borderColor: getRandomColor(),
      backgroundColor: "rgba(0, 0, 0, 0)",
    })),
  });

  const intervalRef = useRef(null);
  const instructor = users.find((user) => user.id === project.instructor);

  useEffect(() => {
    let startTime = Date.now();
    
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/rounds/${roundId}/generator-performance`);
        const newData = await response.json();

        const newTimestamp = ((Date.now() - startTime) / 1000).toFixed(1) + "s";
        setChartData((prevChartData) => {
          const updatedLabels = [...prevChartData.labels, newTimestamp];
          const updatedDatasets = prevChartData.datasets.map((dataset) => {
            const generatorData = newData.find(
              (entry) => entry.generatorId === generators.find(gen => gen.name === dataset.label).id
            );
            return {
              ...dataset,
              data: [...dataset.data, generatorData ? generatorData.performance : 0].slice(-60), // Uchová iba posledných 60 záznamov
            };
          });

          return {
            labels: updatedLabels.slice(-60),
            datasets: updatedDatasets,
          };
        });
      } catch (error) {
        console.error("Chyba pri načítavaní dát:", error);
      }
    };

    fetchData(); // Načítanie dát hneď pri mountnutí komponentu
    intervalRef.current = setInterval(fetchData, 10000); // Načítavanie dát každých 10 sekúnd

    return () => clearInterval(intervalRef.current); // Vyčistenie intervalu pri odmontovaní komponentu
  }, [roundId, generators]);

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
      <div style={{ display: "flex", gap: "10px", justifyContent: "right" }}>
        <Button
          size="sm"
          variant="outline-secondary"
          onClick={() =>
            navigate(`/project/${project.id}`, {
              state: { project, instructor },
            })
          }
        >
        <Button 
          size="sm" 
          variant="outline-secondary" 
          onClick={() => navigate(`/project/${project.id}`, { state: { project, instructor } })}
        >
          Back
        </Button>
      </div>
      <br />

      <h1> Round {index + 1}</h1>
      <h5>{project.name}</h5>
      <h6>{project.date}</h6>

      <ReactSpeedometer
        maxValue={200}
        value={120}
        needleColor="red"
        startColor="green"
        segments={10}
        endColor="blue"
        currentValueText="Current value: ${value}"
      />

      <br />
      <div style={{ height: "400px", marginTop: "20px" }}>
        <Line 
          data={chartData} 
          options={{ 
            responsive: true, 
            maintainAspectRatio: false, 
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Time (s)',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Generator Performance',
                },
              },
            },
          }} 
        />
      </div>
    </div>

    // Podle ID projektu lze poslat na server call pro informace tohoto Round ()
  );
};

export default RoundDetail;