import React, { useState } from "react";
import { useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";
import { connect } from "react-redux";
import action from "../redux/action";
import { useCallback } from "react";

const mapDispatchToProps = (dispatch) => {
  return {
    setSearchTown: (town) => dispatch(action.setSearchTown(town)),
  };
};

const Search = ({ options, setSearchTown }) => {
  const overrideStrings = {
    allItemsAreSelected: "전체",
    clearSearch: "Clear Search",
    clearSelected: "Clear Selected",
    noOptions: "No options",
    search: "검색",
    selectAll: "모두 선택",
    selectAllFiltered: "전체",
    selectSomeItems: "전체",
    create: "Create",
  };
  const [selected, setSelected] = useState([]);

  const set = useCallback(async () => {
    let selectedArray = [];
    selected.forEach((ele) => (selectedArray = [...selectedArray, ele.value]));
    setSearchTown(selectedArray);
  }, [selected]);

  useEffect(() => {
    set();
  }, [set]);

  return (
    <div>
      <pre>{JSON.stringify(selected).value}</pre>
      <MultiSelect
        className="text-center md:text-left"
        options={options}
        value={selected}
        onChange={setSelected}
        hasSelectAll={true}
        labelledBy="select"
        ClearSelectedIcon={""}
        overrideStrings={overrideStrings}
      />
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Search);
