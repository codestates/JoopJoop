import React, { useEffect, useState } from "react";
import { BiArrowFromBottom } from "react-icons/bi";
import { classNames } from "../utils/className";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 20) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  console.log(
    classNames(
      "opacity-0 inline-flex items-center p-3 rounded-full shadow-sm text-white bg-green-95 transition-opacity hover:bg-green-90 focus:outine-none focus:ring-2 focus:ring-offset-2 focus:ring-green-95"
    )
  );

  return (
    <div className="fixed bottom-2 right-2">
      <button
        type="button"
        onClick={scrollToTop}
        className={classNames(
          isVisible ? "opacity-100" : "opacity-0",
          "inline-flex items-center p-3 rounded-full shadow-sm text-white bg-green-95 transition-opacity hover:bg-green-90 focus:outine-none focus:ring-2 focus:ring-offset-2 focus:ring-green-95 ss"
        )}
      >
        <BiArrowFromBottom className="h-6 w-6" aira-hidden="true" />
      </button>
    </div>
  );
};
