import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@fortawesome/fontawesome-free/css/all.css";
import styled from "styled-components";

// umožňuje přepsat defaultní css atributy DatePickeru
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

function DateRangePicker() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <div>
      <Styles>
        <DatePicker
          showIcon
          icon="fa fa-calendar"
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => {
            setDateRange(update);
          }}
          isClearable={true}
          placeholderText="Filter dates"
          style={{ width: "350px" }}
        />
      </Styles>
    </div>
  );
}

export default DateRangePicker;
