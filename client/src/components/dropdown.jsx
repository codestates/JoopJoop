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
          ? "absolute top-[3.2rem] right-[2rem] w-[6rem] h-[2rem] bg-white flex flex-col"
          : "hidden"
      }
      onClick={toggle}
    >
      {/* 알람 정보들을 배열로 받아서 맵으로 뿌려주기? */}
      {/* <Link to={{ url }} className="p-4 shadow hover:bg-green-50">
        {alarm}
      </Link> */}
      <button
        className="hover:bg-green-90 rounded-xl items-center w-[6rem]  h-[2rem] bg-grey-30 text-green-90 hover:text-white border-2 active:bg-green-80 ease-in-out hover:scale-110 duration-200"
        onClick={(e) => history.push("/mypage")}
      >
        {profileImg}
      </button>
      <button
        className="hover:bg-green-90 rounded-xl items-center w-[6rem]  h-[2rem] bg-grey-30 text-green-90 hover:text-white border-2 active:bg-green-80 ease-in-out hover:scale-110 duration-200"
        onClick={(e) => {
          e.preventDefault();
          logout();
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
