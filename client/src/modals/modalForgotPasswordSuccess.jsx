import React from "react";
import ReactDom from "react-dom";
import Button from "../components/button";
import logo from "../img/Logo.png";
import { XIcon } from "@heroicons/react/solid";

const ModalForgotPasswordSuccess = ({ modalOpen, closeModal }) => {
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
        <p className="text-sm flex items-center text-center">
          이메일로 임시 비밀번호가 발급되었습니다. 임시 비밀번호로 로그인하시고
          비밀번호를 꼭 수정해주세요.
        </p>
        <div className="w-10 h-5"></div>
        <div className="w-10 h-1">
          <Button
            className="w-[8.4rem] h-[2.9rem] btn-green rounded-3xl text-center outline text-white"
            children={"로그인"}
          ></Button>
        </div>
      </div>
    </div>,

    document.getElementById("modal"),
  );
};

export default ModalForgotPasswordSuccess;
