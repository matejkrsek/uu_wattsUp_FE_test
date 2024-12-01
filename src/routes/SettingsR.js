import React from "react";
import "../App.css";

import { useData } from "../DataProvider";
import Settings from "../bricks/Settings";

function SettingsR() {
  const { users, generators, gateways, status } = useData();

  return (
    <div style={{ marginTop: "70px" }}>
      <Settings users={users} generators={generators} gateways={gateways}/>
    </div>
  );
}

export default SettingsR;