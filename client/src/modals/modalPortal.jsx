import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const ModalPortal = ({ children, closePortal }) => {
  const [mounted, setMounted] = useState(false);
  const ref = useRef(null);

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

  useEffect(() => {
    setMounted(true);
    if (document) {
      const dom = document.getElementById("modal");
      ref.current = dom;
    }
    return () => {
      setMounted(false);
    };
  }, []);

  if (ref.current && mounted) {
    return createPortal(
      <div className="modal">
        <div
          className="modal-background"
          role="presentation"
          onClick={closePortal}
        />
        <div className="modal-content">
          <div className="modal-content__close">
            <button onClick={closePortal}>x</button>
          </div>
          <div className="modal-content__main">{children}</div>
        </div>
      </div>,
      ref.current,
    );
  }
  return null;
};

export default ModalPortal;
