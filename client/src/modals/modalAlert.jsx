import React, { useEffect } from "react";
import ReactDom from "react-dom";

const ModalAlert = ({ modalOpen, closeModal, messege }) => {
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
      <div className="modal-alert gap-1">
        <div className="flex flex-col space-y-6 pt-4 items-center">
          <div className="text-md text-center">{messege}</div>
          <div>
            <button className="btn btn-red w-[8rem]" onClick={closeModal}>
              확인
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal"),
  );
};

export default ModalAlert;
