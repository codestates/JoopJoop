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

const Navbar = ({
  toggle,
  userNickname,
  profileImg,
  logout,
  menuToggle,
  setMenuToggle,
}) => {
  return (
    <div>
      <header className="flex items-center justify-between bg-white h-[4rem] px-3 border-grey-50 border-b-[1px]">
        <nav className="flex items-center space-x-6">
          <Link to="/home" className="">
            <img
              className="h-[1.75rem] pl-4"
              src="img/logoSmall.svg"
              alt="err"
            />
          </Link>
          <ul className="hidden text-green-90 md:flex md:flex-row items-end space-x-2 pl-4">
            <Link to="/home" className="">
              <li className="text-xl font-semibold px-6 py-1 rounded-lg hover:bg-green-90 hover:text-white active:bg-green-80 ease-in-out hover:scale-110 duration-200">
                <div className="">홈</div>
              </li>
            </Link>
            <Link to="/schedule" className="">
              <li className="text-xl font-semibold px-6 py-1 rounded-lg hover:bg-green-90 hover:text-white duration-200 active:bg-green-80 ease-in-out hover:scale-110">
                <div className="">일정</div>
              </li>
            </Link>
            <Link to="/chat" className="">
              <li className="text-xl font-semibold px-6 py-1 rounded-lg hover:bg-green-90 hover:text-white duration-200 active:bg-green-80 ease-in-out hover:scale-110">
                <div className="">채팅</div>
              </li>
            </Link>
          </ul>
        </nav>
        <div
          className="hidden md:flex hover:bg-green-90 rounded-xl items-center space-x-3 mr-4 py-1 px-4 bg-grey-30 text-green-90 hover:text-white  active:bg-green-80 ease-in-out hover:scale-110 duration-200"
          onClick={toggle}
        >
          <img src={profileImg} className="w-6 h-6 rounded-full" alt="error" />
          <div
            className="cursor-pointer text-lg font-semibold align-middle"
            onClick={toggle}
          >
            {userNickname}
          </div>
        </div>
        <button
          className="md:hidden flex items-center"
          onClick={() => {
            setMenuToggle(!menuToggle);
          }}
        >
          {menuToggle ? (
            <XIcon className="h-8 w-8 text-green-90 mr-3" />
          ) : (
            <MenuIcon className="h-8 w-8 text-green-90 mr-3" />
          )}
        </button>
      </header>

      <div className={classNames("md:hidden", { hidden: !menuToggle })}>
        <ul className="flex flex-col md:hidden bg-green-90 text-white border-t-[1px] space-y-[0.670rem] border-white py-8 items-center text-xl">
          <div className="flex flex-row w-[16rem] h-[4rem] items-center place-content-center py-1 px-2 bg-grey-30 rounded-xl space-x-2 mb-8">
            <img
              src={profileImg}
              className="w-8 h-8 bg-white rounded-full"
              alt="error"
            />
            <div className="text-2xl text-green-100 font-semibold">
              {userNickname}
            </div>
          </div>

          <li className="mt-4 text-[1rem] w-[5rem] text-center bg-white text-grey-80 rounded-md">
            페이지
          </li>

          <div className=""></div>
          <Link
            to="/home"
            className="w-full py-2 hover:bg-white hover:text-green-90 text-center duration-200"
          >
            <li className="x-2 py-2 font-semibold">
              <div className="" onClick={() => setMenuToggle(false)}>
                홈
              </div>
            </li>
          </Link>
          <Link
            to="/schedule"
            className="w-full py-2 hover:bg-white hover:text-green-90 text-center duration-200"
          >
            <li className="px-2 py-2 font-semibold">
              <div className="" onClick={() => setMenuToggle(false)}>
                일정
              </div>
            </li>
          </Link>
          <Link
            to="/schedule"
            className="w-full py-2 hover:bg-white hover:text-green-90 text-center duration-200"
          >
            <li className="px-2 py-2 font-semibold">
              <div className="" onClick={() => setMenuToggle(false)}>
                채팅
              </div>
            </li>
          </Link>

          <div className="h-2"></div>
          <li className="text-[1rem] w-[4rem] text-center bg-white text-grey-80 rounded-md">
            계정
          </li>
          <div></div>
          <Link
            to="/mypage"
            className="w-full py-2 hover:bg-white hover:text-green-90 text-center duration-200"
          >
            <li className="px-2 py-2 font-semibold">
              <div className="" onClick={() => setMenuToggle(false)}>
                마이페이지
              </div>
            </li>
          </Link>
          <div className="w-full py-2 hover:bg-white hover:text-red text-center duration-200">
            <button
              className="px-2 py-2 font-semibold"
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
            >
              로그아웃
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Navbar);
