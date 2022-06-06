import React from "react";
import Button from "../components/button";

const button = ({ className, children, onClick, href }) => {
  return (
    <>
      <a
        className={className}
        href={href}
        onClick={() => {
          console.log({ href });
        }}
      >
        <span>{children}</span>
      </a>
    </>
  );
};

button.defaultProps = {
  className: "btn btn-green",
  children: "button",
  onClick: null,
  href: null,
};

export default button;
