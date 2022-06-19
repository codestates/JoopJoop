import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import Button from "../components/button";
import { XIcon, MapIcon } from "@heroicons/react/solid";
import Participant from "../components/participant";
import MapContainer from "../components/container_map";
import { connect } from "react-redux";
import axios from "axios";

const mapStateToProps = (state) => {
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
    if (!!selectedGathering.author) {
      if (userId === author._id) {
        setIsCreator(true);
      } else {
        setIsCreator(false);
      }
    }
  }, [selectedGathering]);

  useEffect(() => {
    let idArr = [];
    if (participants) {
      const filtered = participants.map((user) => {
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

  useEffect(() => {
    if (modalOpen) {
      document.body.style.cssText = `
        position: fixed; 
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = "";
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      };
    }
  }, [modalOpen]);

  const joinGathering = async () => {
    try {
      const join = axios.post(
        process.env.REACT_APP_DEPLOYSERVER_URL ||
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
        process.env.REACT_APP_DEPLOYSERVER_URL ||
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
        process.env.REACT_APP_DEPLOYSERVER_URL ||
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

  const [viewIdx, setViewIdx] = useState(false);

  useEffect(() => {
    setViewIdx(false);
  }, [modalOpen]);

  if (!modalOpen) return null;
  return ReactDom.createPortal(
    <div>
      <div className="container-modal hidden md:flex">
        <div className="modal-normal md:modal-large gap-4">
          <div className="relative w-full">
            <button
              className="absolute right-[2rem] -top-[5.5rem]"
              onClick={closeModal}
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-row items-start gap-4 w-[669px] h-[379px]">
            <div className="flex flex-col items-center gap-4 w-[313px] h-[353px]">
              {viewIdx === false ? (
                <MapContainer longitude={longitude} latitude={latitude} />
              ) : null}
              <div className="flex flex-row items-center gap-1">
                <img
                  src={author.profileImg}
                  alt="err"
                  className="w-5 h-5 rounded-full"
                />
                <div className="text-[16px]">{author.nickname}</div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-3 w-[340px] h-[379px]">
              <div className="w-[340px] h-[46px] flex border-[1px] border-grey-50 shadow-sm hover:border-green-90 rounded-2xl justify-center items-center">
                <div className="flex text-xl text-center">{title}</div>
              </div>
              <div className="w-[340px] h-[46px] flex border-[1px] border-grey-50 shadow-sm hover:border-green-90 rounded-2xl justify-center items-center">
                <div className="flex text-xl text-center">
                  {town} {place}
                </div>
              </div>
              <div className="w-[340px] h-[46px] flex border-[1px] border-grey-50 shadow-sm hover:border-green-90 rounded-2xl justify-center items-center">
                <div className="flex text-xl text-center">{date}</div>
              </div>
              <div className="w-[340px] h-[46px] flex border-[1px] border-grey-50 shadow-sm hover:border-green-90 rounded-2xl justify-center items-center">
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
                    onClick={() => deleteGathering()}
                  ></Button>
                ) : (
                  <Button
                    className={"btn btn-grey text-lg w-40"}
                    children={"모임삭제"}
                  ></Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-modal md:hidden flex">
        <div className="modal-normal md:modal-large gap-8">
          <div className="relative w-full">
            <button
              className="absolute right-[2rem] -top-[5rem]"
              onClick={closeModal}
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col items-center gap-4 w-[669px] h-[379px]">
            <div className="flex flex-row place-content-between w-[340px] h-[353px]">
              <div className="flex flex-row items-start gap-2">
                <img
                  src={author.profileImg}
                  alt="err"
                  className="w-8 h-8 rounded-full"
                />
                <div className="text-[20px]">{author.nickname}</div>
              </div>
              <button
                className="btn btn-green w-14 h-10"
                onClick={() => setViewIdx(!viewIdx)}
              >
                <MapIcon className="w-5 h-5"></MapIcon>
              </button>
            </div>
            {viewIdx === true ? (
              <MapContainer longitude={longitude} latitude={latitude} />
            ) : null}
            {viewIdx === false ? (
              <div className="flex flex-col items-start gap-3 w-[340px] h-[379px]">
                <div className="w-[340px] h-[46px] flex border-[1px] border-grey-50 shadow-sm hover:border-green-90 rounded-2xl justify-center items-center">
                  <div className="flex text-xl text-center">{title}</div>
                </div>
                <div className="w-[340px] h-[46px] flex border-[1px] border-grey-50 shadow-sm hover:border-green-90 rounded-2xl justify-center items-center">
                  <div className="flex text-xl text-center">
                    {town} {place}
                  </div>
                </div>
                <div className="w-[340px] h-[46px] flex border-[1px] border-grey-50 shadow-sm hover:border-green-90 rounded-2xl justify-center items-center">
                  <div className="flex text-xl text-center">{date}</div>
                </div>
                <div className="w-[340px] h-[46px] flex border-[1px] border-grey-50 shadow-sm hover:border-green-90 rounded-2xl justify-center items-center">
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
                      onClick={() => deleteGathering()}
                    ></Button>
                  ) : (
                    <Button
                      className={"btn btn-grey text-lg w-40"}
                      children={"모임삭제"}
                    ></Button>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>,

    document.getElementById("modal"),
  );
};

export default connect(mapStateToProps)(ModalViewGathering);
