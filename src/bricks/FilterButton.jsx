import React from "react";
import { useFilters } from "../FiltersProvider";
import { Button } from "react-bootstrap";

const FilterButton = ({ search, dates}) => {
  const { setFilters } = useFilters();

  const handleClick = () => {
        
    const filters = { search, startDate: dates[0], endDate: dates[1] }; // Zde měním formát dates z array na objekt, přidávám k němu search a vznikají kompletní filtry...
    setFilters(filters); // Update the filters state   
  };

  return (
    <Button onClick={handleClick}>Filter</Button> 
  );
};

export default FilterButton;
