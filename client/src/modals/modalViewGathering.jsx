import React, { useState } from "react";
import ReactDom from "react-dom";
import Button from "../components/button";
import { XIcon } from "@heroicons/react/solid";
import Participant from "../components/participant";
import MapContainer from "../components/container_map";
import { useEffect } from "react";

const ModalViewGathering = ({ modalOpen, closeModal, selectedGathering }) => {
  const {
    title,
    town,
    place,
    date,
    time,
    longitude,
    latitude,
    author,
    participants,
  } = selectedGathering;
  // console.log(author);

  const [isCreator, setIsCreator] = useState(false);
  const [isJoin, setIsJoin] = useState(false);

  //! redux state로 관리하는 userId와 props로 받아온 author._id 가 같다면 isCreator true
  // useEffect(() => {
  //   if (userId === author._id) {
  //     setIsCreator(true);
  //   } else {
  //     setIsCreator(false);
  //   }
  // }, [author]);

  //! redux state로 관리하는 userId가 props로 받아온 participants에 포함되어 있다면 isJoin true
  // useEffect(() => {
  //   const idArr = participants.map(user => user._id);
  //   if (idArr.includes(userId)) {
  //     setIsJoin(true);
  //   } else {
  //     setIsJoin(false);
  //   }
  // }, [participants]);

  //! redux로 로그인한 유저 id를 관리하고 creator.nickname? id? 와 redux의 정보가 같다면 삭제버튼 활성화 기능 추가 필요
  if (!modalOpen) return null;
  return ReactDom.createPortal(
    <div className="container-modal">
      <div className="modal-large gap-1">
        <div className="relative w-full">
          <button
            className="absolute left-[93.5%] bottom-[4.5rem]"
            onClick={closeModal}
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-ro items-start gap-4 w-[669px] h-[379px]">
          <div className="flex flex-col items-center gap-4 w-[313px] h-[353px]">
            <MapContainer longitude={longitude} latitude={latitude} />
            <div className="flex flex-row items-center gap-1">
              <img src={author.profileImg} alt="err" className="w-5 h-5" />
              <div className="text-[16px]">{author.nickname}</div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3 w-[340px] h-[379px]">
            <div className="w-[340px] h-[46px] flex border-2 rounded-2xl justify-center items-center">
              <div className="flex text-xl text-center">{title}</div>
            </div>
            <div className="w-[340px] h-[46px] flex border-2 rounded-2xl justify-center items-center">
              <div className="flex text-xl text-center">
                {town} {place}
              </div>
            </div>
            <div className="w-[340px] h-[46px] flex border-2 rounded-2xl justify-center items-center">
              <div className="flex text-xl text-center">{date}</div>
            </div>
            <div className="w-[340px] h-[46px] flex border-2 rounded-2xl justify-center items-center">
              <div className="flex text-xl text-center">{time}</div>
            </div>
            <div className="text-xs flex items-center text-center text-grey-80">
              참여자 목록
            </div>
            <div className="flex flex-col items-start gap-2">
              <div className="grid grid-cols-3 gap-1">
                {!!participants
                  ? participants.map((participant, idx) => (
                      <Participant key={idx} participant={participant} />
                    ))
                  : null}
              </div>
            </div>
            <div className="flex flex-col items-center w-full">
              {isCreator ? null : (
                <Button
                  className={"btn btn-green"}
                  children={"참여하기"}
                ></Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,

    document.getElementById("modal"),
  );
};

export default ModalViewGathering;
