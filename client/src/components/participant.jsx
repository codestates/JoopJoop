import React from "react";
import profileImg from "../img/profile.png";

const Participant = ({ participant }) => {
  return (
    <>
      <div className="flex flex-row items-center gap-1">
        <img className="w-4 h-4" src={profileImg} alt="err" />
        <div className="text-xs">{participant.nickname}</div>
      </div>
    </>
  );
};

export default Participant;
