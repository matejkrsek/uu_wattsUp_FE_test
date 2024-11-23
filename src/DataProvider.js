import React, { createContext, useContext, useState, useEffect } from "react";

// Načítanie dát priamo zo statických JSON súborov
import usersData from "./mockData/users.json";
import generatorsData from "./mockData/generators.json";
import roundsData from "./mockData/rounds.json";
import gatewaysData from "./mockData/gateways.json";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [generators, setGenerators] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [gateways, setGateways] = useState([]);
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const fetchData = async () => {
      setStatus("pending");
      try {
        // Namiesto API volania, načítame statické JSON dáta
        setUsers(usersData);
        setGenerators(generatorsData);
        setRounds(roundsData);
        setGateways(gatewaysData);

        setStatus("success");
      } catch (error) {
        console.error("Error loading data:", error);
        setStatus("error");
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        users,
        generators,
        rounds,
        gateways,
        status
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}