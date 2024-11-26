import React from "react";

import DateRangePicker from "./DateRangePicker";
import SearchInput from "./SearchInput";
import CreateProjectButton from "./CreateProjectButton";

const OverviewInterface = () => {
  return (
    <div>
      {/* Filters + filter button */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "3px",
        }}
      >
       
        <SearchInput />
        <DateRangePicker />
        <CreateProjectButton/>

       
      </div>
    </div>
  );
};

export default OverviewInterface;
