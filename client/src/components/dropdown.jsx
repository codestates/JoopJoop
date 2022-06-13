import React from "react";
import { useHistory } from "react-router-dom";

const Dropdown = ({
  isOpen,
  toggle,
  profileImg,
  userId,
  alarm,
  url,
  logout,
}) => {
  const history = useHistory();
  return (
    <div
      className={
        isOpen
          ? "absolute top-10 right-10 h-25 w-17 bg-white flex flex-col"
          : "hidden"
      }
      onClick={toggle}
    >
      {/* 알람 정보들을 배열로 받아서 맵으로 뿌려주기? */}
      {/* <Link to={{ url }} className="p-4 shadow hover:bg-green-50">
        {alarm}
      </Link> */}
      <button
        className="p-4 shadow hover:bg-green-50"
        onClick={(e) => history.push("/mypage")}
      >
        {profileImg}
      </button>
      <button
        className="p-4 shadow hover:bg-green-50"
        onClick={(e) => {
          e.preventDefault();
          logout();
          history.push("/");
        }}
      >
        로그아웃
      </button>
    </div>
  );
};

Dropdown.defaultProps = {
  profileImg: "마이페이지",
  url: "/mypage",
};

export default Dropdown;
