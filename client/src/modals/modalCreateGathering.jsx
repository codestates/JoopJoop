import React, { useState } from "react";
import axios from "axios";
import ReactDom from "react-dom";
import Button from "../components/button";
import { XIcon } from "@heroicons/react/solid";

const ModalCreateGathering = ({ modalOpen, closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginRequestHandler = () => {
    axios
      .post(
        "http://localhost:80/auth/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      )
      .then(res => {
        console.log(res);
      });
  };

  if (!modalOpen) return null;
  return ReactDom.createPortal(
    <div className="container-modal">
      <div className="modal-large gap-4">
        <div className="relative w-full">
          <button
            className="absolute left-[93.5%] bottom-[4.5rem]"
            onClick={closeModal}
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="text-3xl mb-5 felx items-center text-center">
          모임 만들기
        </div>
        <div className="flex felx-row items-start gap-4">
          <div className="w-[313px] h-[313px] rounded-2xl border-2">
            지도 API 추가 후 수정 필요
          </div>
          <div className="flex flex-col items-center gap-4">
            <input
              type="text"
              className=" w-[340px] h-[46px] input-ring-green rounded-3xl text-center"
              placeholder="모임 제목을 입력하세요."
            />
            <input
              type="text"
              className=" w-[340px] h-[46px] input-ring-green rounded-3xl text-center"
              placeholder="장소 선택 기능 추가 필요"
            />
            <input
              type="text"
              className=" w-[340px] h-[46px] input-ring-green rounded-3xl text-center"
              placeholder="날짜를 선택하세요."
            />
            <input
              type="text"
              className=" w-[340px] h-[46px] input-ring-green rounded-3xl text-center"
              placeholder="시간을 선택하세요."
            />
            <Button
              className="btn btn-green w-[189px] h-[46px]"
              children={"모임 만들기"}
            />
          </div>
        </div>
      </div>
    </div>,

    document.getElementById("modal"),
  );
};

export default ModalCreateGathering;
