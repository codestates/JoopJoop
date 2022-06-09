import React from "react";
import profileImg from "../img/profile.png";

const card_gathering = ({ date, time, big, small, content, img, user }) => {
  return (
    <>
      <div className="w-80 h-60 m-2 rounded-2xl border-2 border-grey-50 bg-white shadow-lg flex flex-col">
        <div className="pt-3 pl-5 flex flex-row">
          <div className="h-full w-full flex flex-row items-center gap-2 text-sm text-grey-80">
            <div>{date}</div>
            <div>|</div>
            <div>{time}</div>
          </div>
        </div>
        <div className="h-full w-full flex flex-col items-center mt-7">
          <div className="text-xl font-medium">{big}</div>
          <div className="text-lg">{small}</div>
          <div className="text-sm">{content}</div>
        </div>
        <div className="flex flex-row place-content-center gap-4 items-center m-2">
          <img className="h-8 w-8" src={img} alt="err" />
          <div className=" text-lg">{user}</div>
        </div>
      </div>
    </>
  );
};

card_gathering.defaultProps = {
  date: "7월 13일",
  time: "7:00 PM",
  duration: "3시간",
  big: "강남구",
  small: "학동공원",
  content: "가볍게 줍깅하실 분 구해요!",
  img: profileImg,
  user: "hound_bae",
};

export default card_gathering;
