import React, { useState } from "react";
import Button from "../components/button";
import SearchGathering from "../components/search_gathering";
import SearchGatheringSmall from "../components/search_gathering_small";
import Card from "../components/card_gathering";
import ModalViewGathering from "../modals/modalViewGathering";
import ModalCreateGathering from "../modals/modalCreateGathering";
import { format } from "date-fns";
import { connect } from "react-redux";
import { SearchIcon, MenuIcon, XIcon } from "@heroicons/react/solid";

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
  const [searchOn, setSearchOn] = useState(false);

  let filteredGatherings = gatherings;
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
      const convertedSearchDate = format(searchDate, "yyyy-M-dd").toString();
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
    gatherings.sort(function (a, b) {
      a = new Date(a.date);
      b = new Date(b.date);
      return a - b;
    });
    return gatherings;
  };

  filteredGatherings = filter(gatherings, searchTown, searchDate, searchTime);

  const setGatherToModal = idx => {
    setSelectedGathering(filteredGatherings[idx]);
    setGatherModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="w-full flex flex-col items-center gap-5">
        <div className="h-1 md:h-4"></div>
        <div>주변의 모임을 검색하세요</div>
        <SearchGathering className="flex-row items-center" />
        <div className="flex flex-row space-x-4">
          <Button
            className={"btn btn-green w-[10rem] md:btn md:btn-green"}
            children={"모임 만들기"}
            onClick={() => setCreateGatherModalOpen(true)}
          ></Button>
          <button
            className={"btn btn-dgreen w-[10rem] md:hidden"}
            onClick={() => setSearchOn(!searchOn)}
          >
            {searchOn ? (
              <XIcon className="h-6 w-6 text-white" />
            ) : (
              <SearchIcon className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
        {searchOn ? <SearchGatheringSmall className="flex md:hidden" /> : null}
        <hr className="w-full border-[1px] border-grey-50" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {filteredGatherings.length > 0 ? (
          filteredGatherings.map((gather, idx) => (
            <Card
              key={idx}
              props={gather}
              onClick={() => setGatherToModal(idx)}
            ></Card>
          ))
        ) : (
          <div>표시할 컨텐츠가 없습니다.</div>
        )}
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
