import React, { useState } from "react";
<<<<<<< HEAD
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import action from "../redux/action";
import { ko } from "date-fns/esm/locale";
import { useCallback } from "react";

const mapDispatchToProps = dispatch => {
  return {
    setSearchDate: date => dispatch(action.setSearchDate(date)),
  };
};

const SearchDate = ({ setSearchDate }) => {
  const [startDate, setStartDate] = useState("");

  const set = useCallback(async () => {
    setSearchDate(startDate);
  }, [startDate]);

  useEffect(() => {
    set();
  }, [set]);

  return (
    <DatePicker
      className="w-[6rem]"
      locale={ko}
      dateFormat="yy/MM/dd"
=======
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchDate = props => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      className="w-[6rem]"
>>>>>>> Merge 를 위한 Commit
      selected={startDate}
      onChange={date => setStartDate(date)}
    />
  );
};

<<<<<<< HEAD
export default connect(null, mapDispatchToProps)(SearchDate);
=======
export default SearchDate;
>>>>>>> Merge 를 위한 Commit
