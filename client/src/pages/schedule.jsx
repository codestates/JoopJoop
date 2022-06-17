import React, { useState } from "react";
import ModalViewGathering from "../modals/modalViewGathering";
import Card from "../components/card_gathering";
import mockGatherings from "../mockData/mock_gather.json";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    gatherings: state.gatherings,
    userId: state.userId,
  };
};

const Schedule = ({ gatherings, userId }) => {
  const [gatherModalOpen, setGatherModalOpen] = useState(false);
  const [selectedGathering, setSelectedGathering] = useState(mockGatherings[0]);
  const [preOrPost, setPreOrPost] = useState(true);

  let filteredGatherings = gatherings;

  const filter = gatherings => {
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
    gatherings = gatherings.filter(gathering => {
      if (!!gathering.participants) {
        let idArr = [];
        const filtered = gathering.participants.map(user => {
          return user._id;
        });
        idArr = [...filtered];
        return idArr.includes(userId) || gathering.author._id === userId;
      } else {
        return null;
      }
    });

    gatherings.sort(function (a, b) {
      a = new Date(a.date);
      b = new Date(b.date);
      return a - b;
    });
    return gatherings;
  };

  filteredGatherings = filter(gatherings);

  const setGatherToModal = idx => {
    setSelectedGathering(filteredGatherings[idx]);
    setGatherModalOpen(true);
  };

  return (
    <div>
      <div className="flex flex-row">
        <button className="btn" onClick={() => setPreOrPost(true)}>
          다가오는 일정
        </button>
        <button className="btn" onClick={() => setPreOrPost(false)}>
          종료된 일정
        </button>
      </div>
      <hr className="w-full border-[1px] border-grey-50" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {filteredGatherings.length > 0 ? (
          filteredGatherings
            .filter(gather => {
              const date = gather.date.split("-");
              const year = date[0];
              let monthIndex = date[1];
              monthIndex--;
              const day = date[2];
              let hour = Number(gather.time.split(":")[0]);
              if (gather.time.split(" ")[1] === "PM") {
                hour = hour + 12;
              }
              const minute = gather.time.slice(2, 4);
              if (preOrPost) {
                return (
                  new Date(year, monthIndex, day, String(hour), minute) >
                  new Date()
                );
              } else {
                return (
                  new Date(year, monthIndex, day, String(hour), minute) <
                  new Date()
                );
              }
            })
            .map((gather, idx) => (
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
    </div>
  );
};

export default connect(mapStateToProps)(Schedule);
