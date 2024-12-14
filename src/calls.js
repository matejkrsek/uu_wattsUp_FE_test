import projects from "./mockData/projects";
import users from "./mockData/users";
import generators from "./mockData/generators";
import rounds from "./mockData/rounds";
import gateways from "./mockData/gateways";

const BASE_URL =
  "https://unicornunicersity-wattsup-be-test.azurewebsites.net/api/"; // Adresa back-endu

const USE_MOCK_DATA = false; // Nastavte na false, pokud chcete používat skutečné API místo mock dat

// Všeobecná funkce na API volání
async function call(method, url, dtoIn = null, opts = {}) {
  try {
    const response = await fetch(BASE_URL + url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: dtoIn ? JSON.stringify(dtoIn) : null,
      //   credentials: "include", // Tento řádek zajistí, že VŠECHNY cally budou obsahovat cookie s accessTokenem
      ...opts,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Server Error");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Network Error");
  }
}

// Mock data spracovanie
function mockCall(url, dtoIn) {
  switch (url) {
    case "/mockedCreateProject":
      const newProject = { id: Date.now(), ...dtoIn };
      projects.push(newProject); // Uložení do lokálního array
      return Promise.resolve({
        message: "Project created successfully (mocked)",
        project: newProject,
      });

    case "/mockedUpdateProject":
      const index = projects.findIndex((p) => p.id === dtoIn.id);
      if (index === -1) {
        return Promise.reject(new Error("Project not found"));
      }
      projects[index] = { ...projects[index], ...dtoIn }; // Aktualizace
      return Promise.resolve({
        message: "Project updated successfully (mocked)",
        project: projects[index],
      });

    case "/mockedDeleteProject":
      const projectId = dtoIn.id;
      const updatedProjects = projects.filter((p) => p.id !== projectId);
      if (projects.length === updatedProjects.length) {
        return Promise.reject(new Error("Project not found"));
      }
      projects.length = 0; // Vyčištění původního pole
      projects.push(...updatedProjects); // Aktualizace lokálního array
      return Promise.resolve({
        message: "Project deleted successfully (mocked)",
        projectId,
      });

    case "/mockedListProjects":
      return Promise.resolve([...projects]); // Vrátení kópie zoznamu projektov

    case "/mockedListUsers":
      return Promise.resolve([...users]);

    case "/mockedListGenerators":
      return Promise.resolve([...generators]);

    case "/mockedListRounds":
      return Promise.resolve([...rounds]);

    case "/mockedListGateways":
      return Promise.resolve([...gateways]);

    default:
      return Promise.reject(new Error("Mock URL not handled"));
  }
}

// Login function
export async function login(dtoIn) {
  return await call("POST", "/login", dtoIn);
}

// API funkcie pro Projects
export async function loadProjects() {
  const url = USE_MOCK_DATA ? "/mockedListProjects" : "project/list"; // Pro reálný back-end
  return USE_MOCK_DATA ? mockCall(url) : call("GET", url);
}

export async function createProject(dtoIn) {
  const url = USE_MOCK_DATA ? "/mockedCreateProject" : "project/create"; // Pro reálný back-end
  return USE_MOCK_DATA ? mockCall(url, dtoIn) : call("POST", url, dtoIn);
}

export async function updateProject(dtoIn) {
  const url = USE_MOCK_DATA ? "/mockedUpdateProject" : "project/update"; // Pro reálný back-end
  return USE_MOCK_DATA ? mockCall(url, dtoIn) : call("POST", url, dtoIn);
}

export async function deleteProject(dtoIn) {
  const url = USE_MOCK_DATA ? "/mockedDeleteProject" : "project/delete"; // Pro reálný back-end
  return USE_MOCK_DATA ? mockCall(url, dtoIn) : call("POST", url, dtoIn);
}

export async function loadProject(projectId) {
  const url = USE_MOCK_DATA
    ? `/mockedGetProject/${projectId}`
    : `project/${projectId}`; // Pro reálný back-end
  return USE_MOCK_DATA ? mockCall(url, { id: projectId }) : call("GET", url);
}

// Ostatní funkce, které byly komentovány:
// export async function loadUsers() {
//   const url = USE_MOCK_DATA ? "/mockedListUsers" : "http://127.0.0.1:8000/users/list";
//   return USE_MOCK_DATA ? mockCall(url) : call("GET", url);
// }

// export async function loadGenerators() {
//   const url = USE_MOCK_DATA ? "/mockedListGenerators" : "http://127.0.0.1:8000/generators/list";
//   return USE_MOCK_DATA ? mockCall(url) : call("GET", url);
// }

// export async function loadRounds() {
//   const url = USE_MOCK_DATA ? "/mockedListRounds" : "http://127.0.0.1:8000/rounds/list";
//   return USE_MOCK_DATA ? mockCall(url) : call("GET", url);
// }

// export async function loadGateways() {
//   const url = USE_MOCK_DATA ? "/mockedListGateways" : "http://127.0.0.1:8000/gateways/list";
//   return USE_MOCK_DATA ? mockCall(url) : call("GET", url);
// }
