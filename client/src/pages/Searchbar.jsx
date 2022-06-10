import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setDogs } from "../redux/action.js";

const mapDispatchToProps = dispatch => {
  return {
    setDogs: dog => dispatch(setDogs(dog)),
  };
};

const Searchbar = ({ setDogs }) => {
  const searchHandler = async () => {
    setDogs("아아아아");
  };

  return (
    <>
      <button className="button" onClick={() => searchHandler()}>
        <span className="text">바뀌라</span>
      </button>
    </>
  );
};

export default connect(null, mapDispatchToProps)(Searchbar);
