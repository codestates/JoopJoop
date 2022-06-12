import React, { useState, useEffect } from "react";
import ModalViewGathering from "../modals/modalViewGathering";
import Card from "../components/card_gathering";
import mockGatherings from "../mockData/mock_gather.json";
import { format } from "date-fns";

const Schedule = () => {
  const [gatherModalOpen, setGatherModalOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [selectedGathering, setSelectedGathering] = useState(mockGatherings[0]);
  const [preOrPost, setPreOrPost] = useState(true);

  let filteredGatherings = mockGatherings;

  useEffect(() => {
    setSelectedGathering(mockGatherings[selectedIdx]);
  }, [selectedIdx]);

  useEffect(() => {
    // console.log(preOrPost);
  }, [preOrPost]);

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
        {filteredGatherings
          .filter(gather => {
            if (preOrPost) {
              return gather.date > format(new Date(), "yyyy-MM-dd").toString();
            } else {
              return gather.date < format(new Date(), "yyyy-MM-dd").toString();
            }
          })
          .map(gather => (
            <Card
              key={gather.id}
              props={gather}
              onClick={() => {
                setSelectedIdx(gather.id - 1);
                setGatherModalOpen(true);
              }}
            ></Card>
          ))}
      </div>
      <ModalViewGathering
        modalOpen={gatherModalOpen}
        closeModal={() => setGatherModalOpen(false)}
        selectedGathering={selectedGathering}
      />
    </div>
  );
};

export default Schedule;
