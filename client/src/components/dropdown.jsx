import React from "react";
import { Link } from "react-router-dom";

const Dropdown = ({ isOpen, toggle, profileImg, userId, alarm, url }) => {
  return (
    <div
      className={
        isOpen
          ? "absolute top-16 right-10 h-25 w-17 bg-white flex flex-col  transition duration-300 ease-in-out animate-bounce "
          : "hidden"
      }
      onClick={toggle}
    >
      {/* 알람 정보들을 배열로 받아서 맵으로 뿌려주기? */}
      {/* <Link to={{ url }} className="p-4 shadow hover:bg-green-50">
        {alarm}
      </Link> */}
      <Link to="/mypage" className="p-4 shadow hover:bg-green-50">
        {profileImg}
      </Link>
      <Link to="/logout" className="p-4 shadow hover:bg-green-50">
        로그아웃
      </Link>
    </div>
  );
};

Dropdown.defaultProps = {
  profileImg: "마이페이지",
  url: "/mypage",
};

export default Dropdown;
