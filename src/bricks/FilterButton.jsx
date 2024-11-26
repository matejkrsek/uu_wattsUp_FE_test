import React from "react";
import { useFilters } from "../FiltersProvider";
import { Button } from "react-bootstrap";

const FilterButton = ({ search, dates }) => {
  const { setFilters } = useFilters();

  const handleClick = () => {
    const filters = { search, dates }; // Create the filters object
    setFilters(filters); // Update the filters state
   
  };

  return (
    <Button onClick={handleClick}>Filter</Button> 
  );
};

export default FilterButton;
