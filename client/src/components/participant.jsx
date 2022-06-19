import React from "react";

const Participant = ({ participant }) => {
  return (
    <>
      <div className="flex flex-row items-center gap-1">
        <img
          className="w-4 h-4"
          src={`${process.env.REACT_APP_LOCALSERVER_URL}${participant.profileImg}`}
          alt="err"
        />
        <div className="text-xs">{participant.nickname}</div>
      </div>
    </>
  );
};

export default Participant;
