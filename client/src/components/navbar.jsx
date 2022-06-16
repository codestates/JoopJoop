import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { XIcon, MenuIcon } from "@heroicons/react/solid";
import classNames from "classnames";

const mapStateToProps = (state) => {
  return {
    userNickname: state.loginNickname,
    profileImg: state.profileImg,
  };
};

const Navbar = ({ toggle, userNickname, profileImg, logout }) => {
  const [menuToggle, setMenuToggle] = useState(false);

  return (
    <div>
      <header className="flex items-center justify-between bg-green-90 h-12 px-3">
        <nav className="flex items-center space-x-6">
          <Link to="/home" className="">
            <img className="w-25 h-10" src="img/logoSmall.png" alt="err" />
          </Link>
          <ul className="hidden md:flex space-x-6">
            <li className="text-white text-xl">
              <Link to="/home" className="text-lg font-semibold">
                <div className="">홈</div>
              </Link>
            </li>
            <li className="text-white text-lg font-semibold">
              <Link to="/schedule" className="">
                <div className="">일정</div>
              </Link>
            </li>
            <li className="text-white text-lg font-semibold">
              <Link to="/chat" className="">
                <div className="">채팅</div>
              </Link>
            </li>
            <li className="text-white text-lg font-semibold">
              <Link to="/community" className="">
                <div className="">커뮤니티</div>
              </Link>
            </li>
          </ul>
        </nav>
        <div
          className="hidden md:flex items-center space-x-2 mr-4 p-1 px-2"
          onClick={toggle}
        >
          <img src={profileImg} className="w-5 h-5 rounded-full" alt="error" />
          <div className="cursor-pointer text-white" onClick={toggle}>
            {userNickname}
          </div>
        </div>
        <button
          className="md:hidden flex items-center"
          onClick={() => setMenuToggle(!menuToggle)}
        >
          {menuToggle ? (
            <XIcon className="h-6 w-6 text-white" />
          ) : (
            <MenuIcon className="h-6 w-6 text-white" />
          )}
        </button>
      </header>

      <div className={classNames("md:hidden", { hidden: !menuToggle })}>
        <ul className="flex flex-col md:hidden bg-green-90 text-white border-t-[1px] border-white pr-5 space-y-2 py-4 items-end text-xl">
          <div className="flex flex-row items-center py-2 px-2 border-b-2 space-x-2">
            <img
              src={profileImg}
              className="w-6 h-6 bg-white rounded-full"
              alt="error"
            />
            <div className="text-2xl font-semibold">{userNickname}</div>
          </div>
          <li className="px-2">
            <Link to="/home" className="">
              <div
                className="mt-2 font-semibold"
                onClick={() => setMenuToggle(false)}
              >
                홈
              </div>
            </Link>
          </li>
          <li className="px-2 font-semibold">
            <Link to="/schedule" className="">
              <div className="" onClick={() => setMenuToggle(false)}>
                일정
              </div>
            </Link>
          </li>
          <li className="px-2 font-semibold">
            <Link to="/mypage" className="">
              <div className="" onClick={() => setMenuToggle(false)}>
                마이페이지
              </div>
            </Link>
          </li>
          <button className="px-2 font-semibold" onClick={() => logout()}>
            로그아웃
          </button>
        </ul>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Navbar);
