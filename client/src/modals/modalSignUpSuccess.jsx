import React from "react";
import ReactDom from "react-dom";
import Button from "../components/button";
import logo from "../img/Logo.png";
import { XIcon } from "@heroicons/react/solid";

const ModalSignUpSuccess = ({ modalOpen, closeModal }) => {
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
          회원 가입 인증 메일이 전송되었습니다. 메일에서 인증을 마치신 후
          JOOPJOOP을 이용하실 수 있습니다.
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

export default ModalSignUpSuccess;
