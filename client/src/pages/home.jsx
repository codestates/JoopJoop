import React, { useState, useEffect } from "react";
import Button from "../components/button";
import SearchGathering from "../components/search_gathering";
import Card from "../components/card_gathering";
import ModalViewGathering from "../modals/modalViewGathering";
import ModalCreateGathering from "../modals/modalCreateGathering";
import { format } from "date-fns";
import { connect } from "react-redux";
import action from "../redux/action";

const mapStateToProps = state => {
  return {
    searchTown: state.searchTown,
    searchDate: state.searchDate,
    searchTime: state.searchTime,
    gatherings: state.gatherings,
    isLoading: state.isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setIsLoading: boolean => dispatch(action.setIsLoading(boolean)),
  };
};

//! date 형식 변경이 있을 수 있어 console.log 남겨놓겠습니다.

const Home = ({
  isLoading,
  setIsLoading,
  gatherings,
  searchTown,
  searchDate,
  searchTime,
}) => {
  const [gatherModalOpen, setGatherModalOpen] = useState(false);
  const [createGatherModalOpen, setCreateGatherModalOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [selectedGathering, setSelectedGathering] = useState(gatherings[0]);

  useEffect(() => {
    setSelectedGathering(gatherings[selectedIdx]);
    setIsLoading(true);
  }, [selectedIdx]);

  let filteredGatherings = gatherings;
  if (isLoading) {
    const filter = (gatherings, searchTown, searchDate, searchTime) => {
      if (searchTown.length > 0 && searchTown.length < 25) {
        gatherings = gatherings.filter(gathering =>
          searchTown.includes(gathering.town),
        );
      }
      if (searchDate !== "") {
        const convertedSearchDate = format(searchDate, "yyyy-MM-dd").toString();
        gatherings = gatherings.filter(gathering => {
          return gathering.date === convertedSearchDate;
        });
      }
      if (searchTime.length === 1) {
        searchTime.forEach(filterTime => {
          if (filterTime === "오전") {
            gatherings = gatherings.filter(gathering => {
              return gathering.time.split(" ")[1] === "AM";
            });
          }
          if (filterTime === "오후") {
            gatherings = gatherings.filter(gathering => {
              return gathering.time.split(" ")[1] === "PM";
            });
          }
        });
      }
      return gatherings;
    };

    filteredGatherings = filter(gatherings, searchTown, searchDate, searchTime);
  } else {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="h-6"></div>
      <SearchGathering className="flex flex-row items-center" />
      <Button className={"btn btn-green"} children={"모임 만들기"}></Button>
      <hr className="w-full border-[1px] border-grey-50" />
      {isLoading ? (
        <div className="grid grid-cols-4 gap-4">
          {filteredGatherings.map((gather, idx) => (
            <Card
              key={idx}
              props={gather}
              onClick={() => {
                setSelectedIdx(idx);
                setGatherModalOpen(true);
              }}
            ></Card>
          ))}
        </div>
      ) : null}
      {isLoading ? (
        <ModalViewGathering
          modalOpen={gatherModalOpen}
          closeModal={() => setGatherModalOpen(false)}
          selectedGathering={selectedGathering}
        />
      ) : null}
      <ModalCreateGathering
        modalOpen={createGatherModalOpen}
        closeModal={() => setCreateGatherModalOpen(false)}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
