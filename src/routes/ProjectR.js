import React, { useContext, useEffect } from "react";

import "../App.css";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
import { useProject } from "../ProjectProvider";
import ProjectDetail from "../bricks/ProjectDetail";


function ProjectR() {
  const params = useParams();
  const location = useLocation();
  const { fetchProject } = useProject();
  const { project, createdByUser } = location.state;

  console.log(project, createdByUser)

  return (

    <div style={{ marginTop: "50px" }}>

      <ProjectDetail project={project} createdByUser={createdByUser} />

    </div>
  );
}

export default ProjectR;