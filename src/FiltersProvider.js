import React, { createContext, useContext, useState } from 'react';

const FiltersContext = createContext();

export function FiltersProvider({ children }) {

  const [filters, setFilters] = useState({
    search: "",
    startDate:"",
    endDate:""
  });

  return (
    <FiltersContext.Provider value={{
     filters, setFilters
    }}>
      {children}
    </FiltersContext.Provider>
  );
};

export function useFilters() {
  return useContext(FiltersContext);
};