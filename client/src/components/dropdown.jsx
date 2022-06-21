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
          ? "absolute top-[3.5rem] right-[2rem] w-[6rem] flex flex-col border-[1px] border-grey-50 rounded-lg bg-white ease-in-out hover:scale-110 duration-200"
          : "hidden"
      }
      onClick={toggle}
    >
      {/* 알람 정보들을 배열로 받아서 맵으로 뿌려주기? */}
      {/* <Link to={{ url }} className="p-4 shadow hover:bg-green-50">
        {alarm}
      </Link> */}
      <button
        className="py-1 rounded-t-md hover:bg-green-90 items-center text-green-90 hover:text-white active:bg-green-80"
        onClick={(e) => history.push("/mypage")}
      >
        {profileImg}
      </button>
      <button
        className="py-1 rounded-b-md hover:bg-green-90 items-center text-green-90 hover:text-white active:bg-green-80"
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
