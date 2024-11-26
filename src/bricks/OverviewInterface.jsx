// In OverviewInterface.js
import React, { useState } from "react";
import DateRangePicker from "./DateRangePicker";
import SearchInput from "./SearchInput";
import CreateProject from "./CreateProject";
import FilterButton from "./FilterButton";

const OverviewInterface = () => {
  const [search, setSearch] = useState(""); // State for search input
  const [dates, setDates] = useState([null, null]); // State for date range

  // Function to update the search state when it changes
  const handleSearchChange = (value) => {
    setSearch(value);
  };

  // Function to update the date range when it changes
  const handleDateRangeChange = (range) => {
    setDates(range);
  };

  return (
    <div>
    
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "3px",
        }}
      >
       
        <SearchInput value={search} onSearchChange={handleSearchChange} />

        <DateRangePicker value={dates} onDateRangeChange={handleDateRangeChange} />

        <FilterButton search={search} dates={dates} />

        <CreateProject />
      </div>
    </div>
  );
};

export default OverviewInterface;
