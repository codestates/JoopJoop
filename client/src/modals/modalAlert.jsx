import React, { useEffect } from "react";
import ReactDom from "react-dom";
import { XIcon } from "@heroicons/react/solid";

const ModalAlert = ({ modalOpen, closeModal, onDeleteAccount }) => {
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
      <div className="modal-mobile md:modal-large gap-1">
        <div className="relative w-full">
          <button
            className="absolute left-[91.5%] bottom-2"
            onClick={closeModal}
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <div>dkdkdkkdkdkdk</div>
      </div>
    </div>,
    document.getElementById("modal"),
  );
};

export default ModalAlert;
