import React, { useState } from "react";
import axios from "axios";
import ReactDom from "react-dom";
import Button from "../components/button";
import logo from "../img/Logo.png";
import { XIcon } from "@heroicons/react/solid";

const ModalFixProfile = ({ modalOpen, closeModal }) => {
  const [introduct, setIntroduct] = useState("");

  // 자기소개 수정 axios 추가 필요

  if (!modalOpen) return null;
  return ReactDom.createPortal(
    <div className="container-modal">
      <div className="modal-normal gap-3">
        <div className="relative w-full">
          <button
            className="absolute left-[91.5%] bottom-2"
            onClick={closeModal}
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <img className="w-52" src={logo} alt="err"></img>
        <div className="w-10 h-1"></div>
        <input
          type="profile"
          className="input-ring-green w-[23.25rem] h-[16.5rem] rounded-3xl text-center placeholder:text-grey-70"
          placeholder="자기소개를 입력하세요."
          onChange={event => setIntroduct(event.target.value)}
        />
        <div className="">
          <Button className="w-[8.4rem] h-[2.9rem] btn-green rounded-3xl text-center outline text-white">
            수정
          </Button>
        </div>
      </div>
    </div>,

    document.getElementById("modal"),
  );
};

export default ModalFixProfile;
