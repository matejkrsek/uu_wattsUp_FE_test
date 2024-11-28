import React, { useEffect } from "react";
import "../App.css";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

import ProjectCards from "../bricks/ProjectCards";
import OverviewInterface from "../bricks/OverviewInterface";
import { useProject } from "../ProjectProvider";
import { useData } from "../DataProvider";
import { useFilters } from "../FiltersProvider";

function OverviewR() {
  const { status, projects, fetchProject } = useProject();
  const { users } = useData();
  const { filters } = useFilters();

  

  useEffect(() => {
    fetchProject();
    
  }, [filters]);

  const updateProject = () => {
    fetchProject();
  };

  // Convert string date to Date object for comparison
  const parseDate = (date) => (date ? new Date(date) : null);


const filteredProjects = projects.filter((project) => {
  const projectDate = parseDate(project.date);
  const startDate = parseDate(filters.startDate);
  const endDate = parseDate(filters.endDate);

  const matchesDate =
    (!startDate || projectDate >= startDate) &&
    (!endDate || projectDate <= endDate);

  // Ensure filters.search is a string before calling toLowerCase
 const searchLower = (filters.search || "").toLowerCase(); // Default to empty string if undefined
 const matchesSearch =
    project.name.toLowerCase().includes(searchLower) ||
    project.school.toLowerCase().includes(searchLower);

  return matchesDate  && matchesSearch;
});


  function getChild() {
    switch (status.state) {
      case "pending":
        return (
          <div className="loading">
            <Icon size={10} path={mdiLoading} spin={true} />
          </div>
        );
      case "success":
        return (
          <>
            <ProjectCards
              projects={filteredProjects}
              users={users}
              onLoadSuccess={updateProject}
            />
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
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "55px",
        gap: "15px",
      }}
    >
      {getChild()}
      <OverviewInterface />
      <br />
    </div>
  );
}

export default OverviewR;
