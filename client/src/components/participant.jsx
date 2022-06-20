import React from "react";

const Participant = ({ participant }) => {
  let profileImg = participant.profileImg;
  if (profileImg[0] !== "/") {
    profileImg = "/" + profileImg;
  }

  return (
    <>
      <div className="flex flex-row items-center gap-1 rounded-full">
        <img
          className="w-4 h-4 rounded-full"
          src={`${process.env.REACT_APP_LOCALSERVER_URL}${profileImg}`}
          alt="err"
        />
        <div className="text-xs">{participant.nickname}</div>
      </div>
    </>
  );
};

export default Participant;
