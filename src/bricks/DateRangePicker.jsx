import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@fortawesome/fontawesome-free/css/all.css";
import styled from "styled-components";
import { useFilters } from "../FiltersProvider";

// Enables overriding the default CSS attributes of the DatePicker
const Styles = styled.div`
  .react-datepicker-wrapper,
  .react-datepicker__input-container,
  .react-datepicker__input-container input {
    width: 240px;
    border-radius: 5px; /* Round the input */
  }

  .react-datepicker__close-icon::before,
  .react-datepicker__close-icon::after {
    background-color: red;
  }
`;

const DateRangePicker = ({ value, onDatesChange }) => {
  const { filters} = useFilters();
  const [dates, setDates] = useState([filters.startDate, filters.endDate] || value || [null, null]); // DatePicker vyžaduje stav jako pole dvou hodnot...
  

  useEffect(() => {
    console.log(filters);
    setDates([filters.startDate, filters.endDate]); // Sync state with prop changes
  }, [filters.startDate, filters.endDate]);

  const handleChange = (update) => { // update je pole dvou hodnot [startDate, endDate]
    setDates(update);
    onDatesChange(update); // Notify parent component
    
  };

  return (
    <div>
      <Styles>
        <DatePicker
          showIcon
          icon="fa fa-calendar"
          selectsRange
          startDate={dates[0]} // DatePicker vyžaduje stav jako pole dvou hodnot...
          endDate={dates[1]}
          onChange={handleChange}
          isClearable
          placeholderText="Filter dates"
        />
      </Styles>
    </div>
  );
};

export default DateRangePicker;
