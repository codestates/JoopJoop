import React, { useState } from "react";
import { useEffect } from "react";
import Button from "../components/button";
import SearchGathering from "../components/search_gathering";
import Card from "../components/card_gathering";
import ModalViewGathering from "../modals/modalViewGathering";

import mockGatherings from "../mockData/mock_gather.json";

const Home = () => {
  const [gatherModalOpen, setGatherModalOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const selectdGathering = mockGatherings[0];

  useEffect(() => {
    const selectdGathering = mockGatherings[selectedIdx];
  }, [selectedIdx]);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="h-6"></div>
      <SearchGathering className="flex flex-row items-center" />
      <Button className={"btn btn-green"} children={"모임 만들기"}></Button>
      <hr className="w-full border-[1px] border-grey-50" />
      <div className="grid grid-cols-4 gap-4">
        {mockGatherings.map(gather => (
          <Card
            key={gather.id}
            props={gather}
            onClick={() => {
              setSelectedIdx(gather.id);
              setGatherModalOpen(true);
            }}
          ></Card>
        ))}
      </div>
      <ModalViewGathering
        modalOpen={gatherModalOpen}
        closeModal={() => setGatherModalOpen(false)}
        selectdGathering={selectdGathering}
      />
    </div>
  );
};

export default Home;
