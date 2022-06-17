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
      <div className="grid grid-cols-4 gap-4">
        {filteredGatherings.length > 0 ? (
          filteredGatherings
            .filter(gather => {
              if (preOrPost) {
                console.log(gather.date + gather.time);
                return new Date(gather.date + gather.time) > new Date();
              } else {
                return new Date(gather.date) < new Date();
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
