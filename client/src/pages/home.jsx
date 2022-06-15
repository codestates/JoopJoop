import React, { useState } from "react";
import Button from "../components/button";
import SearchGathering from "../components/search_gathering";
import Card from "../components/card_gathering";
import ModalViewGathering from "../modals/modalViewGathering";
import ModalCreateGathering from "../modals/modalCreateGathering";
import { format } from "date-fns";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    searchTown: state.searchTown,
    searchDate: state.searchDate,
    searchTime: state.searchTime,
    gatherings: state.gatherings,
    isLoading: state.isLoading,
  };
};

const Home = ({
  isLoading,
  gatherings,
  searchTown,
  searchDate,
  searchTime,
}) => {
  const [gatherModalOpen, setGatherModalOpen] = useState(false);
  const [createGatherModalOpen, setCreateGatherModalOpen] = useState(false);
  const [selectedGathering, setSelectedGathering] = useState(gatherings[0]);

  let filteredGatherings = gatherings;
  if (isLoading) {
    const filter = (gatherings, searchTown, searchDate, searchTime) => {
      gatherings = gatherings.filter(
        gathering =>
          !!gathering.title &&
          !!gathering.town &&
          !!gathering.place &&
          !!gathering.date &&
          !!gathering.time &&
          !!gathering.longitude &&
          !!gathering.latitude &&
          !!gathering.author,
      );
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

  const setGatherToModal = idx => {
    setSelectedGathering(gatherings[idx]);
    setGatherModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="h-6"></div>
      <SearchGathering className="flex flex-row items-center" />
      <Button
        className={"btn btn-green"}
        children={"모임 만들기"}
        onClick={() => setCreateGatherModalOpen(true)}
      ></Button>
      <hr className="w-full border-[1px] border-grey-50" />
      <div className="grid grid-cols-4 gap-4">
        {filteredGatherings.map((gather, idx) => (
          <Card
            key={idx}
            props={gather}
            onClick={() => setGatherToModal(idx)}
          ></Card>
        ))}
      </div>
      <ModalViewGathering
        modalOpen={gatherModalOpen}
        closeModal={() => setGatherModalOpen(false)}
        selectedGathering={selectedGathering}
      />
      <ModalCreateGathering
        modalOpen={createGatherModalOpen}
        closeModal={() => setCreateGatherModalOpen(false)}
      />
    </div>
  );
};

export default connect(mapStateToProps)(Home);
