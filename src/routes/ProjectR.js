import React, { useContext, useEffect } from "react";

import "../App.css";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
import { useProject } from "../ProjectProvider";
import { useData } from "../DataProvider";

import ProjectDetail from "../bricks/ProjectDetail";

function ProjectR() {
  const params = useParams();
  const location = useLocation();
  const { fetchProject } = useProject();
  const { generators, rounds, energy } = useData();
  const { project, instructor } = location.state;

  // console.log(project, instructor)

  return (
    <div style={{ marginTop: "50px" }}>
      <ProjectDetail 
        project={project} 
        instructor={instructor} 
        generators={generators} 
        rounds={rounds}
        energy={energy}
      />
    </div>
  );
}

export default ProjectR;
