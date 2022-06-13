import React, { useState } from "react";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import action from "../redux/action";
import { ko } from "date-fns/esm/locale";
import { useCallback } from "react";

const mapDispatchToProps = (dispatch) => {
  return {
    setSearchDate: (date) => dispatch(action.setSearchDate(date)),
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
      selected={startDate}
      onChange={(date) => setStartDate(date)}
    />
  );
};

export default connect(null, mapDispatchToProps)(SearchDate);
