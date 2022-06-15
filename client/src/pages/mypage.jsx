import React, { useState } from "react";
import EditProfile from "./editProfile";
import mockUsers from "../mockData/mock_user.json";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    userEmail: state.loginEmail,
    userNickname: state.loginNickname,
    profileImg: state.profileImg,
  };
};

const Mypage = ({ userEmail, userNickname, profileImg }) => {
  const [editMode, setEditMode] = useState(false);

  const switchEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="h-647 flex justify-center ">
      {editMode ? (
        <EditProfile switchEditMode={switchEditMode} />
      ) : (
        <div className="flex items-center w-80% h-auto">
          <img className="w-40 h-40 rounded-full " src={profileImg} alt="" />
          <div className="flex flex-col ">
            <label>이메일</label>
            <p className="w-72 h-10 bg-white text-center rounded-3xl outline md:outline-2 placeholder:text-grey-70">
              {userEmail}
            </p>
            <label>닉네임</label>
            <p className="w-72 h-10 bg-white text-center rounded-3xl outline md:outline-2 placeholder:text-grey-70">
              {userNickname}
            </p>
            <button
              className="w-36 h-12 btn-green mx-3 my-3 text-center rounded-3xl  text-white"
              onClick={switchEditMode}
            >
              회원정보수정
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default connect(mapStateToProps)(Mypage);
