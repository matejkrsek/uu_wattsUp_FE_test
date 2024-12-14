import React, { createContext, useContext, useState } from "react";
import {
  loadProjects,
  createProject,
  updateProject,
  deleteProject,
} from "./calls";

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState({
    state: "pending",
  });

  // Načítanie projektov
  const fetchProject = async () => {
    setStatus({ state: "pending" });
    try {
      const data = await loadProjects();
      console.log("we did it with Vadim");
      console.log(data.projects);
      setProjects(data.projects);

      setStatus({ state: "success" });
    } catch (error) {
      console.error("Error loading data:", error);
      setStatus({ state: "error", error });
    }
  };

  // Vytvorenie nového projektu
  const handleCreateProject = async (newProject, callback) => {
    try {
      await createProject(newProject);
      console.log("proběhl Create v handleCreateProject");
      callback && callback();
      fetchProject();
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  // Aktualizácia projektu
  const handleUpdateProject = async (updatedProject, callback) => {
    try {
      await updateProject(updatedProject);
      callback && callback();
      fetchProject();
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  // Vymazanie projektu
  const handleDeleteProject = async (requestData, callback) => {
    try {
      await deleteProject(requestData);
      callback && callback();
      fetchProject();
      console.log("success");
    } catch (error) {
      console.error("Error deleting project:", error);
      throw error;
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        status,
        projects,
        fetchProject,
        createProject: handleCreateProject,
        updateProject: handleUpdateProject,
        deleteProject: handleDeleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  return useContext(ProjectContext);
}
