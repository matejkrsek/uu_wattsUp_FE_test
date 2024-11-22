import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DateRangePicker from "./DateRangePicker";

const OverviewInterface = () => {
  const [filters, setFilters] = useState({
    name: "",
    schoolName: "",
    dates: "",
  });

  const [search, setSearch] = useState("");
  const [schoolName, setSchoolName] = useState("");
  // const [dates, setDates] = useState("");

  const handleFilters = () => {
    // setContext ... filtry?
  };

  return (
    <div>
      {/* filtry + filter button */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "3px",
        }}
      >
        {/*zastřešuje jak hledání názvu projektu, tak hledání názvu školy*/}
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
          onChange={(e) => setSearch(e.target.value)}
        />
        <DateRangePicker />

        <Button onClick={handleFilters()}>Filter</Button>
      </div>

      {/*Create new project button */}
      <div> </div>
    </div>
  );
};

export default OverviewInterface;
