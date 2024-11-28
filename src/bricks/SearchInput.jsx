import React, { useState, useEffect } from "react";
import { useFilters } from "../FiltersProvider";

const SearchInput = ({ value, onSearchChange, onApplyFiltersByEnter }) => {
  const { filters } = useFilters();
  const [search, setSearch] = useState(filters.search || value || "");

  useEffect(() => {
    setSearch(search);
  }, [search]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSearch(newValue);
    onSearchChange(newValue); // Notify parent component
  };

  const handleKeyDown = (e) => {  // zastřešuje filtraci na stisknutí ENTER klávesy
    if (e.key === "Enter") {
      onApplyFiltersByEnter(search); // Call the function to apply filters
    }
  };

  return (
    <input
      type="text"
      className="form-control"
      style={{
        width: "80vw",
        maxWidth: "400px",
        minWidth: "300px",
      }}
      placeholder="Search"
      value={search}
      onChange={handleChange}
      onKeyDown={handleKeyDown} // Trigger on Enter
    />
  );
};

export default SearchInput;
