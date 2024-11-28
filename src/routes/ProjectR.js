import React, { useContext, useEffect } from "react";

import "../App.css";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import ProjectDetail from "../bricks/ProjectDetail";


function ProjectR() {

  const navigate = useNavigate(); 
const params = useParams();

  useEffect(() => {
    // fetch Data
  }, []);



  return (
   


    <div style={{ marginTop: "100px" }}>

<Button onClick={() => navigate("/")}>Back</Button>
      <ProjectDetail />
    
    </div>
  );
}

export default ProjectR;
