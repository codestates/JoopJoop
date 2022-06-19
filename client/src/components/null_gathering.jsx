import React from "react";

const NullGathering = () => {
  return (
    <>
      <div className="flex flex-col justify-center h-[22rem]">
        <div className="flex flex-col justify-center bg-grey-80 rounded-full h-[17rem] w-[17rem]">
          <div className="text-center text-white text-lg font-semibold">
            참여한 모임이 없어요
          </div>
          <div className="text-center text-white text-lg font-semibold">
            지금 바로 모임에 참여해보세요
          </div>
        </div>
      </div>
    </>
  );
};

export default NullGathering;
