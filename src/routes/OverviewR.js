import React, { useEffect, useContext, useState } from "react";
import "../App.css";
import ProjectTiles from "../bricks/ProjectCards";


function OverviewR() {

 return (
    <div style={{ marginTop:"100px" }}>
      <ProjectTiles/>
    </div>
  );
};

export default OverviewR;