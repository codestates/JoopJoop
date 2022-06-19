import React from "react";
import { ChevronDoubleDownIcon } from "@heroicons/react/solid";
import { classNames } from "../utils/className";

export const ScrollToLogin = () => {
  let location = 700;
  if (document.querySelector("#login")) {
    location = document.querySelector("#login").offsetTop;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: location, behavior: "smooth" });
  };
  return (
    <div className="fixed bottom-4 right-4">
      <button
        type="button"
        onClick={scrollToTop}
        className={classNames(
          "inline-flex items-center p-3 rounded-full shadow-sm text-white bg-green-100 transition-opacity hover:bg-green-95 focus:outine-none focus:ring-offset-2 focus:ring-green-95",
        )}
      >
        <ChevronDoubleDownIcon className="h-6 w-6" aira-hidden="true" />
      </button>
    </div>
  );
};
