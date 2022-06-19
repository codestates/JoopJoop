import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const Search = ({ options }) => {
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

  return (
    <div>
      <pre>{JSON.stringify(selected).value}</pre>
      <MultiSelect
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

export default Search;
