import React from "react";

const cardgathering = ({
  date,
  time,
  duration,
  big,
  small,
  content,
  img,
  user,
}) => {
  return (
    <>
      <div className="w-[20.5rem] h-[12rem] p-4 m-2 rounded-2xl bg-white shadow-lg flex flex-col ease-linear duration-300">
        <div className="h-full w-full basis-2/3 flex flex-row">
          <div className="h-full w-full flex flex-row items-center">
            <div className="m-2 pl-1 text-lg">{date}</div>
            <div className="spacer">|</div>
            <div className="m-2 pl-1 text-lg">{time}</div>
          </div>
        </div>
        <div className="flex flex-col items-center m-2">
          <div className="pl-1">{big}</div>
          <div className="pl-1">{small}</div>
          <div className="pl-1">{content}</div>
        </div>
        <div className="flex flex-row place-content-center items-center m-2">
          <div className="pl-1">{img}</div>
          <div className="pl-1">{user}</div>
        </div>
      </div>
    </>
  );
};

cardgathering.defaultProps = {
  date: "7월 13일",
  time: "7:00 PM",
  duration: "3시간",
  big: "강남구",
  small: "학동공원",
  content: "가볍게 줍깅하실 분 구해요!",
  img: "img",
  user: "hound_bae",
};

export default cardgathering;
