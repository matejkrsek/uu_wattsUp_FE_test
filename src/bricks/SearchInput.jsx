import React, { useState, useEffect } from "react";
import { useFilters } from "../FiltersProvider";

const SearchInput = ({ value, onSearchChange }) => {
  const { filters } = useFilters();
  const [search, setSearch] = useState(value || filters.search || "");

  useEffect(() => {
    setSearch(value);
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSearch(newValue);
    onSearchChange(newValue); // Notify parent component
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
    />
  );
};

export default SearchInput;
