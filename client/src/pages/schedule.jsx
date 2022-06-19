import React, { useState } from "react";
import ModalViewGathering from "../modals/modalViewGathering";
import Card from "../components/card_gathering";
import { connect } from "react-redux";
import NullGathering from "../components/null_gathering";

const mapStateToProps = (state) => {
  return {
    gatherings: state.gatherings,
    userId: state.userId,
  };
};

const Schedule = ({ gatherings, userId }) => {
  const [gatherModalOpen, setGatherModalOpen] = useState(false);
  const [selectedGathering, setSelectedGathering] = useState(gatherings[0]);
  const [preOrPost, setPreOrPost] = useState(true);

  let filteredGatherings = gatherings;

  const filter = (gatherings) => {
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
    gatherings = gatherings.filter((gathering) => {
      if (!!gathering.participants) {
        let idArr = [];
        const filtered = gathering.participants.map((user) => {
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

  const preGatherings = filteredGatherings.filter((gather) => {
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
    return new Date(year, monthIndex, day, String(hour), minute) > new Date();
  });

  const postGatherings = filteredGatherings.filter((gather) => {
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
    return new Date(year, monthIndex, day, String(hour), minute) < new Date();
  });

  const setPreGatherToModal = (idx) => {
    setSelectedGathering(preGatherings[idx]);
    setGatherModalOpen(true);
  };

  const setPostGatherToModal = (idx) => {
    setSelectedGathering(postGatherings[idx]);
    setGatherModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-[6rem] flex flex-row justify-center align-center space-x-8 pt-6 mb-5 bg-grey-10 bg-opacity-30 border-b-[1px] border-grey-50">
        <button className="btn btn-green" onClick={() => setPreOrPost(true)}>
          다가오는 일정
        </button>
        <button className="btn btn-grey" onClick={() => setPreOrPost(false)}>
          종료된 일정
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {filteredGatherings.length > 0 ? (
          preOrPost ? (
            preGatherings.length > 0 ? (
              preGatherings.map((gather, idx) => (
                <Card
                  key={idx}
                  props={gather}
                  onClick={() => {
                    setPreGatherToModal(idx);
                  }}
                ></Card>
              ))
            ) : (
              <NullGathering />
            )
          ) : postGatherings.length > 0 ? (
            postGatherings.map((gather, idx) => (
              <Card
                key={idx}
                props={gather}
                onClick={() => {
                  setPostGatherToModal(idx);
                }}
              ></Card>
            ))
          ) : (
            <NullGathering />
          )
        ) : (
          <NullGathering />
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
