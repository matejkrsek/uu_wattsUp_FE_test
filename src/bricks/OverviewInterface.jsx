import React, { useState } from "react";
import { Button } from "react-bootstrap";

const OverviewInterface = () => {
  const [filters, setFilters] = useState({
    name: "",
    schoolName: "",
    dates: "",
  });

  const [name, setName] = useState("");
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
          color: "red",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "3px",
        }}
      >
        <input
          type="text"
          className="form-control"
          style={{
            width: "80vw",
            maxWidth: "400px",
            minWidth: "300px",
          }}
          placeholder="Search name of the project"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          style={{
            width: "80vw",
            maxWidth: "400px",
            minWidth: "300px",
          }}
          placeholder="Search name of the school"
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
        />
        <Button onClick={handleFilters()}>Filter</Button>
      </div>

      {/*Create new project button */}
      <div> </div>
    </div>
  );
};

export default OverviewInterface;
