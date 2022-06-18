import React from "react";
import ReactDom from "react-dom";
import { XIcon } from "@heroicons/react/solid";

const ModalConfirmSignOut = ({ modalOpen, closeModal, onDeleteAccount }) => {
  if (!modalOpen) return null;

  return ReactDom.createPortal(
    <div className="container-modal">
      <div className="modal-large gap-1">
        <div className="relative w-full">
          <button
            className="absolute left-[91.5%] bottom-2"
            onClick={closeModal}
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="p-10">
          <h1 className="text-3xl">회원 탈퇴하게 되셔도 </h1>
        </div>
        <div className="text-2xl mx-3 my-3">
          <p> 꾸준히 줍깅 하실꺼죠? 😉😉 </p>
        </div>
        <div className="flex">
          <button
            className="w-44 h-12 bg-red mx-3 mt-10 text-center rounded-3xl"
            onClick={closeModal}
          >
            계속 이용할래요!
          </button>
          <button
            className="w-44 h-12 bg-grey-50 mx-3 mt-10 text-center rounded-3xl"
            onClick={() => {
              onDeleteAccount();
              window.location.reload();
            }}
          >
            그만 할게요...
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default ModalConfirmSignOut;
