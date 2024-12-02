import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./output.css";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./App";

import { ProjectProvider } from "./ProjectProvider";
import { DataProvider } from "./DataProvider";
import { FiltersProvider } from "./FiltersProvider";

import ProjectR from "./routes/ProjectR";
import OverviewR from "./routes/OverviewR";
import LoginR from "./routes/LoginR";
import SettingsR from "./routes/SettingsR";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProjectProvider>
      <DataProvider>
        <FiltersProvider>
          <Router>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<LoginR />} />
                <Route path="/project/:id" element={<ProjectR />} />
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
