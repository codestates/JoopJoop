import React, { useState } from "react";
import Button from "../components/button";
import SearchGathering from "../components/search_gathering";
import SearchGatheringSmall from "../components/search_gathering_small";
import Card from "../components/card_gathering";
import ModalViewGathering from "../modals/modalViewGathering";
import ModalCreateGathering from "../modals/modalCreateGathering";
import { format } from "date-fns";
import { connect } from "react-redux";
import { SearchIcon, XIcon } from "@heroicons/react/solid";
import { ScrollToTop } from "../components/scrollToTop";
import NullGatheringHome from "../components/null_gathering_home";

const mapStateToProps = (state) => {
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
      (gathering) =>
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
      gatherings = gatherings.filter((gathering) =>
        searchTown.includes(gathering.town),
      );
    }
    if (searchDate !== "") {
      const convertedSearchDate = format(searchDate, "yyyy-M-dd").toString();
      gatherings = gatherings.filter((gathering) => {
        return gathering.date === convertedSearchDate;
      });
    }
    if (searchTime.length === 1) {
      searchTime.forEach((filterTime) => {
        if (filterTime === "오전") {
          gatherings = gatherings.filter((gathering) => {
            return gathering.time.split(" ")[1] === "AM";
          });
        }
        if (filterTime === "오후") {
          gatherings = gatherings.filter((gathering) => {
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
    gatherings = gatherings.filter((gathering) => {
      const date = gathering.date.split("-");
      const year = date[0];
      let monthIndex = date[1];
      monthIndex--;
      const day = date[2];
      let hour = Number(gathering.time.split(":")[0]);
      if (gathering.time.split(" ")[1] === "PM") {
        hour = hour + 12;
      }
      const minute = gathering.time.slice(2, 4);
      return new Date(year, monthIndex, day, String(hour), minute) > new Date();
    });

    return gatherings;
  };

  filteredGatherings = filter(gatherings, searchTown, searchDate, searchTime);

  const setGatherToModal = (idx) => {
    setSelectedGathering(filteredGatherings[idx]);
    setGatherModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center gap-5 mb-8">
      <div className="w-full flex flex-col items-center gap-5 bg-grey-10 bg-opacity-30">
        <div className="h-1 md:h-4"></div>
        <div className="text-grey-90 text-xl">
          🌱 주변의 모임을 검색해보세요 🔍
        </div>
        <SearchGathering className="flex-row items-center" />
        <div className="flex flex-row space-x-4 mb-4 pt-4">
          <div className="flex flex-col items-center space-y-4">
            <div className="text-grey-90 text-lg">
              🗓 찾는 모임이 없으신가요? 🏃‍♂️
            </div>
            <Button
              className={"btn btn-green w-[10rem] md:btn md:btn-green"}
              children={"모임 만들기"}
              onClick={() => setCreateGatherModalOpen(true)}
            ></Button>
          </div>
          <button
            className={"btn btn-dgreen w-[10rem] md:hidden erase-hover"}
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
      {filteredGatherings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {filteredGatherings.map((gather, idx) => (
            <Card
              key={idx}
              props={gather}
              onClick={() => setGatherToModal(idx)}
            ></Card>
          ))}
        </div>
      ) : (
        <NullGatheringHome />
      )}
      <ModalViewGathering
        modalOpen={gatherModalOpen}
        closeModal={() => setGatherModalOpen(false)}
        selectedGathering={selectedGathering}
      />
      <ModalCreateGathering
        modalOpen={createGatherModalOpen}
        closeModal={() => setCreateGatherModalOpen(false)}
      />
      <ScrollToTop />
    </div>
  );
};

export default connect(mapStateToProps)(Home);
