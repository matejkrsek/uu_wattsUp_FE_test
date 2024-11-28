import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./App";

import { ProjectProvider } from "./ProjectProvider";
import { DataProvider } from "./DataProvider";
import ProjectR from "./routes/ProjectR";
import OverviewR from "./routes/OverviewR";
import LoginR from "./routes/LoginR";
import SettingsR from "./routes/SettingsR";
import { FiltersProvider } from "./FiltersProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProjectProvider>
      <DataProvider>
        <FiltersProvider>
        <Router>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<OverviewR />} />
              <Route path="/project/:projectId" element={<ProjectR />} />
              <Route path="/overview" element={<OverviewR />} />
              <Route path="/settings" element={<SettingsR />} />
              <Route path="/login" element={<LoginR />} />
            </Route>
          </Routes>
        </Router>
        </FiltersProvider>
      </DataProvider>
    </ProjectProvider>
  </React.StrictMode>
);

reportWebVitals();
