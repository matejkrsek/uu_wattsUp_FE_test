import React, { useEffect, useContext, useState } from "react";
import "../App.css";
import ProjectCards from "../bricks/ProjectCards";
import OverviewInterface from "../bricks/OverviewInterface";

function OverviewR() {
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
      <ProjectCards />
    </div>
  );
}

export default OverviewR;
