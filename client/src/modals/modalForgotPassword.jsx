import React from "react";
import ReactDom from "react-dom";
import Button from "../components/button";
import logo from "../img/Logo.png";
import { XIcon } from "@heroicons/react/solid";

const ModalForgotPassword = ({ modalOpen, closeModal }) => {
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
        <div className="w-10 h-5"></div>
        <input
          type="text"
          className="input-ring-green"
          placeholder="Email을 입력하세요."
        />
        <div>
          비밀번호 찾기 결과에 따라 "등록된 이메일이 없습니다. 표시 필요
        </div>
        <div className="w-10 h-5"></div>
        <div className="w-10 h-1">
          <Button
            className="w-[8.4rem] h-[2.9rem] btn-green rounded-3xl text-center outline text-white"
            children={"비밀번호 찾기"}
          ></Button>
        </div>
      </div>
    </div>,

    document.getElementById("modal"),
  );
};

export default ModalForgotPassword;
