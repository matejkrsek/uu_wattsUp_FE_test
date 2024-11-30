import React from "react";
import Icon from "@mdi/react";
import { useFilters } from "../../FiltersProvider";
import { Button } from "react-bootstrap";
import { mdiFilterOutline } from "@mdi/js";

const FilterButton = ({ search, dates }) => {
  const { setFilters } = useFilters();

  const handleClick = () => {
    const filters = { search, startDate: dates[0], endDate: dates[1] }; // Zde měním formát dates z array na objekt, přidávám k němu search a vznikají kompletní filtry...
    setFilters(filters); // Update the filters state
  };

  return (
    <Button
      onClick={handleClick}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "auto", // or 'auto' for md
        padding: "0.25rem", // equivalent to p-1 in Tailwind
      }}
    >
      <Icon path={mdiFilterOutline} size={1} />
    </Button>
  );
};

export default FilterButton;

//
