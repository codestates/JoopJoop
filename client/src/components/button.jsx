import React from "react";

const button = ({ className, children, onClick }) => {
  return (
    <>
      <div uttonclassName={className} type="button" onClick={onClick}>
        {children}
      </div>
    </>
  );
};

button.defaultProps = {
  className: "btn btn-green",
  children: "button",
  onclick: null,
};

export default button;
