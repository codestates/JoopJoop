import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchDate = props => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      className="w-[6rem]"
      selected={startDate}
      onChange={date => setStartDate(date)}
    />
  );
};

export default SearchDate;
