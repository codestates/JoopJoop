import React, { useState } from "react";
import EditProfile from "./editProfile";
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

  const handleImgError = (e) => {
    e.target.src = "img/default.png";
  };

  return (
    <div className="h-647 flex justify-center bg-grey-10">
      {editMode ? (
        <EditProfile
          setEditMode={setEditMode}
          switchEditMode={switchEditMode}
        />
      ) : (
        <div className="flex space-x-4 flex-col md:flex-row items-center mt-10 w-100% h-auto">
          <img
            className="w-40 h-40 rounded-full mb-[3.8rem]"
            src={profileImg}
            onError={handleImgError}
          />
          <div className="flex flex-col">
            <label>이메일</label>
            <p className="w-[340px] h-[46px] input-ring-green rounded-3xl text-center my-2 pt-2">
              {userEmail}
            </p>
            <label>닉네임</label>
            <div className="flex-col">
              <p className="w-[340px] h-[46px] input-ring-green text-center rounded-3xl my-2 pt-[0.6rem]">
                {userNickname}
              </p>
            </div>

            <button
              className="w-36 h-12 btn-green my-3 text-center rounded-3xl text-white "
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
