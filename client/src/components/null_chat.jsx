import React from "react";

const NullChat = () => {
  return (
    <>
      <div className="flex flex-col justify-center h-[22rem]">
        <div className="flex flex-col justify-center bg-grey-80 rounded-full h-[17rem] w-[17rem]">
          <div className="text-center text-white text-lg font-semibold">
            구현중인 기능이에요😢
          </div>
          <div className="text-center text-white text-lg font-semibold">
            아쉽지만 조금만 기다려주세요!
          </div>
        </div>
      </div>
    </>
  );
};

export default NullChat;
