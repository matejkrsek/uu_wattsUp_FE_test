import React, { useContext, useEffect } from "react";

import "../App.css";
import { useData } from "../DataProvider";
import { useLocation } from "react-router-dom";

import RoundDetail from "../bricks/RoundDetail";

function RoundR() {
  const location = useLocation();
  const { users } = useData();
  const { round, project, filteredGenerators, index } = location.state;

  // console.log(project, createdByUser)

  return (
    <div style={{ marginTop: "50px" }}>
      <RoundDetail round={round} project={project} generators={filteredGenerators} users={users} index={index} />
    </div>
  );
}

export default RoundR;