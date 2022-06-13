import React, { useState } from "react";
import mockUsers from "../mockData/mock_user.json";
import action from "../redux/action";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    email: state.email,
    nickname: state.nickname,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setEmail: (email) => dispatch(action.setEmail(email)),
    setNickname: (nickname) => dispatch(action.setNickname(nickname)),
  };
};

const EditProfile = ({
  switchEditMode,
  email,
  nickname,
  setEmail,
  setNickname,
}) => {
  const onSubmit = () => {};
  const onDeleteAccount = () => {};
  console.log(nickname);

  return (
    <div className="flex items-center w-80% h-auto">
      <img className="w-40 h-40 rounded-full " src="img/favicon.png" alt="" />
      <div className="flex flex-col">
        <label>유저 이메일</label>
        <input
          name="email"
          defalutvalue={email}
          className="w-72 h-10 bg-white text-center rounded-3xl outline md:outline-2 placeholder:text-grey-70"
          onChange={(email) => {
            console.log(email.target.value);
          }}
        ></input>
        <label>유저 닉네임</label>
        <input
          name="nickname"
          defalutvalue={nickname}
          className="w-72 h-10 bg-white text-center rounded-3xl outline md:outline-2 placeholder:text-grey-70"
          onChange={(event) => {
            console.log(event.target.value);
            setNickname(event.target.value);
            console.log(nickname);
          }}
        ></input>
        <div className="flex">
          <button
            className=" w-36 h-12 btn-green mx-3 my-3 text-center rounded-3xl  text-white"
            onClick={() => {
              console.log("click");
              switchEditMode();
            }}
          >
            수정하기
          </button>
          <button
            className=" w-36 h-12 btn-red mx-3 my-3 text-center rounded-3xl  text-white"
            onClick={onDeleteAccount}
          >
            계정삭제 하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
