// In OverviewInterface.js
import React, { useEffect, useState } from "react";
import DateRangePicker from "./DateRangePicker";
import SearchInput from "./SearchInput";
import CreateProject from "./CreateProject";
import FilterButton from "./FilterButton";
import { useFilters } from "../FiltersProvider";

const OverviewInterface = () => {
  const [search, setSearch] = useState(""); // State for search input
  const [dates, setDates] = useState([]); // State for dates (datepicker requires an arrray)
  const {filters, setFilters } = useFilters();

  const applyFiltersByEnter = (searchValue) => { // zastřešuje filtraci na stisknutí ENTER klávesy
    const filters = { search: searchValue, startDate: dates[0], endDate: dates[1] };
    setFilters(filters); // Update filters
  };

  // Function to update the search state when it changes
  const handleSearchChange = (search) => {
    setSearch(search);
  };

  // Function to update the date range when it changes
  const handleDatesChange = (dates) => {
    setDates(dates);
    
  };

  useEffect(() => {
    setDates([filters.startDate, filters.endDate])
    setSearch(filters.search);
    
  }, [filters.search, filters.startDate, filters.endDate]);

  return (
    <div>
    
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "10px",
        }}
      >
       
          <SearchInput value={search} onSearchChange={handleSearchChange} onApplyFiltersByEnter={applyFiltersByEnter} // zastřešuje filtraci na stisknutí ENTER klávesy
        />

        <DateRangePicker value={dates} onDatesChange={handleDatesChange} />

        <FilterButton search={search} dates={dates} />
<div style={{marginLeft:"100px"}}> <CreateProject /></div>
       
      </div>
    </div>
  );
};

export default OverviewInterface;
