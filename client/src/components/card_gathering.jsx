import React from "react";

const card_gathering = ({ gathering }) => {
  return (
    <>
      <div className="rounded-2xl border-x-grey-50 border-2 drop-shadow-sm">
        <div className="header">
          <div className="datecontainer">
            <div className="month-date">7월 13일</div>
            <div className="spacer">|</div>
            <div className="time">7:00 PM</div>
          </div>
          <div className="duration">3시간</div>
        </div>
        <div className="body">
          <div>강동구</div>
          <div>논현동 학동공원</div>
          <div>가볍게 줍깅하실 분 구해요!</div>
        </div>
        <div>
          <div>img</div>
          <div>hound_bae</div>
        </div>
      </div>
    </>
  );
};

card_gathering.defaultProps = {};

export default card_gathering;
