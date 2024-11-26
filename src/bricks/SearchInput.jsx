import React, { useState } from "react";
import { useFilters } from "../FiltersProvider";

const SearchInput = () => {
  const { filters, setFilters } = useFilters();
  const [search, setSearch] = useState(filters.search || "");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setFilters({ ...filters, search: value });
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
