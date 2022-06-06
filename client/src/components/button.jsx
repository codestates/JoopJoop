import React from "react";

const button = ({ className, children, onClick }) => {
  return (
    <>
      <button className={className} type="button" onClick={onClick}>
        {children}
      </button>
    </>
  );
};

button.defaultProps = {
  className: "btn btn-green",
  children: "button",
  onclick: null,
};

export default button;
