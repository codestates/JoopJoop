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
      className="border-grey-70 text-center border-[1px] rounded-[3px] h-10 w-80 md:w-[6rem]"
      locale={ko}
      dateFormat="yy/MM/dd"
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      placeholderText="날짜"
    />
  );
};

export default connect(null, mapDispatchToProps)(SearchDate);
