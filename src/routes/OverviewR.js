import React, { useEffect, useContext, useState } from "react";
import "../App.css";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

import ProjectCards from "../bricks/ProjectCards";
import OverviewInterface from "../bricks/OverviewInterface";
import { useProject } from "../ProjectProvider";
import { useData } from "../DataProvider";


function OverviewR() {
  const { status, projects, fetchProject } = useProject();
  const { users } = useData();

  useEffect(() => {
    fetchProject(); 
  }, []); 

  const updateProject = () => {
    fetchProject(); 
  }

  function getChild() {
    switch (status.state) {
      case "pending":
        return (
          <div className="loading">
            <Icon size={10} path={mdiLoading} spin={true}/>
          </div>
        );
      case "success":
        return (
          <>
            <ProjectCards projects={projects} users={users} onLoadSuccess={updateProject}/>
          </>
        );
      case "error":
        return (
          <div>
            <div>"Failed to load list data."</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "100px",
        marginLeft: "50px",
        gap: "15px",
      }}
    >
      <OverviewInterface />
      <br />
      {getChild()}
    </div>
  );
}

export default OverviewR;