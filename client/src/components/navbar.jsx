import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ toggle, loginId }) => {
  return (
    <header className="flex items-center bg-green-90 h-12">
      <nav className="flex items-center">
        <Link to="/" className="">
          <img className="w-25 h-10" src="img/logoSmall.png" />
        </Link>
        <ul className="flex">
          <li className="p-4 text-white text-xl font-mono">
            <Link to="/home" className="">
              <div className="">홈</div>
            </Link>
          </li>
          <li className="p-4 text-white text-xl font-mono">
            <Link to="/schedule" className="">
              <div className="">일정</div>
            </Link>
          </li>
          <li className="p-4 text-white text-xl font-mono">
            <Link to="/chat" className="">
              <div className="">채팅</div>
            </Link>
          </li>
          <li className="p-4 text-white text-xl font-mono">
            <Link to="/community" className="">
              <div className="">커뮤니티</div>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex absolute right-12 p-4" onClick={toggle}>
        <img className="w-5 h-5 mr-4 cursor-pointer" src="img/favicon.png" />
        <div className="cursor-pointer" onClick={toggle}>
          {loginId}
        </div>
      </div>
    </header>
  );
};

Navbar.defaultProps = {
  className: "btn btn-green",
  loginId: "로그인 ID",
};

export default Navbar;
