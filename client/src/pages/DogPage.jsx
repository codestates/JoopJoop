import React, { useEffect, useState } from "react";
//redux state 가져오기
import { connect } from "react-redux";

const mapState = state => {
  return {
    dogData: state.dogData,
  };
};

const DogPage = ({ dogData }) => {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    //강아지 검색을 했을 때
    if (dogData.length !== 0) {
      setDogs(dogData);
    }
  }, [dogData]);

  return (
    <div>
      <div>{dogs}</div>
      <button>ddd</button>
    </div>
  );
};

export default connect(mapState)(DogPage);
