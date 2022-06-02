import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <nav className="flex items-center bg-green-90 h-12 ">
      <Link to="/" className="">
        <div className="">
          <img className="w-20 h-10" src="img/logoSmall.png" />
        </div>
      </Link>
      <ul className="flex">
        <li className="p-2 text-white text-xl">
          <Link to="/home" className="">
            <div className="">홈</div>
          </Link>
        </li>
        <li className="p-2 text-white text-xl">
          <Link to="/schedule" className="">
            <div className="">일정</div>
          </Link>
        </li>
        <li className="p-2 text-white text-xl">
          <Link to="/chat" className="">
            <div className="">채팅</div>
          </Link>
        </li>
        <li className="p-2 text-white text-xl">
          <Link to="/community" className="">
            <div className="">커뮤니티</div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
