import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import Button from "../components/button";
import { XIcon } from "@heroicons/react/solid";
import Participant from "../components/participant";
import MapContainer from "../components/container_map";
import { connect } from "react-redux";
import axios from "axios";

const mapStateToProps = state => {
  return {
    userId: state.userId,
    loginNickname: state.loginNickname,
  };
};

const ModalViewGathering = ({
  modalOpen,
  closeModal,
  selectedGathering,
  userId,
  loginNickname,
}) => {
  const {
    _id,
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

  const [isCreator, setIsCreator] = useState(false);
  const [isJoin, setIsJoin] = useState(false);

  useEffect(() => {
    if (userId === author._id) {
      setIsCreator(true);
    } else {
      setIsCreator(false);
    }
  }, [selectedGathering]);

  useEffect(() => {
    let idArr = [];
    if (participants) {
      const filtered = participants.map(user => {
        return user._id;
      });
      idArr = [...filtered];
    }
    if (idArr.includes(userId)) {
      setIsJoin(true);
    } else {
      setIsJoin(false);
    }
  }, [selectedGathering]);

  const joinGathering = async () => {
    try {
      const join = axios.post(
        process.env.REACT_APP_LOCALSERVER_URL + "/gatherings/participation",
        {
          gathering_id: _id,
          participant_id: userId,
        },
        {
          withCredentials: true,
        },
      );
      window.location.reload();
    } catch (err) {
      throw err;
    }
  };

  const cancellateGathering = async () => {
    try {
      const cancellation = axios.post(
        process.env.REACT_APP_LOCALSERVER_URL + "/gatherings/cancellation",
        {
          gathering_id: _id,
          participant_id: userId,
        },
        {
          withCredentials: true,
        },
      );
      window.location.reload();
    } catch (err) {
      throw err;
    }
  };

  const deleteGathering = async () => {
    try {
      const remove = axios.delete(
        process.env.REACT_APP_LOCALSERVER_URL + "/gatherings/" + _id,
        {
          nickname: loginNickname,
        },
        {
          withCredentials: true,
        },
      );
      window.location.reload();
    } catch (err) {
      throw err;
    }
  };

  // TODO redux로 로그인한 유저 id를 관리하고 creator.nickname? id? 와 redux의 정보가 같다면 삭제버튼 활성화 기능 추가 필요
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
            <div className="flex flex-row items-center w-full space-x-4">
              {isCreator ? (
                <button className="btn btn-grey text-lg w-40">
                  모임 참가하기
                </button>
              ) : isJoin ? (
                <Button
                  className={"btn btn-red text-lg w-40"}
                  children={"탈퇴하기"}
                  onClick={() => {
                    cancellateGathering();
                  }}
                ></Button>
              ) : (
                <Button
                  className={"btn btn-green text-lg w-40"}
                  children={"참여하기"}
                  onClick={() => {
                    joinGathering();
                  }}
                ></Button>
              )}

              {isCreator ? (
                <Button
                  className={"btn btn-red text-lg w-40"}
                  children={"모임삭제"}
                  onClick={() => {}}
                ></Button>
              ) : (
                <Button
                  className={"btn btn-grey text-lg w-40"}
                  children={"모임삭제"}
                  onClick={() => deleteGathering()}
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

export default connect(mapStateToProps)(ModalViewGathering);
