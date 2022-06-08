import React, { useState } from "react";
import ReactDom from "react-dom";
import axios from "axios";
import Button from "../components/button";
import logo from "../img/Logo.png";
import { XIcon } from "@heroicons/react/solid";

const localURL = "http://localhost:80";

const ModalSignUp = ({ modalOpen, closeModal }) => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    nickname: "",
  });

  console.log(userInfo);

  const handleInputValue = key => e => {
    setUserInfo({ ...userInfo, [key]: e.target.value });
  };
  const handleSignup = () => {
    const { email, password, nickname } = userInfo;
    axios
      .post(
        `${localURL}/auth/register`,
        {
          email: email,
          password: password,
          nickname: nickname,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      )
      .then(res => {
        console.log(res);
      });
  };

  if (!modalOpen) return null;
  return ReactDom.createPortal(
    <div className="container-modal">
      <div className="modal-normal gap-3" onSubmit={e => e.preventDefault()}>
        <div className="relative w-full">
          <button
            className="absolute left-[91.5%] bottom-2"
            onClick={closeModal}
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <img className="w-52" src={logo} alt="err"></img>
        <form className="flex flex-col justify-center text-center items-center">
          <input
            type="email"
            className="w-72  h-10 bg-white text-center rounded-3xl outline md:outline-2 placeholder:text-grey-70"
            placeholder="Email을 입력하세요."
            onChange={handleInputValue("email")}
          />
          <input
            type="password"
            className="w-367 h-10   bg-white text-center rounded-3xl my-3 outline md:outline-2 placeholder:text-grey-70"
            placeholder="비밀번호를 입력하세요."
            onChange={handleInputValue("password")}
          />
          <input
            type="text"
            className="w-72  h-10 bg-white text-center rounded-3xl outline md:outline-2 placeholder:text-grey-70"
            placeholder="닉네임을 입력하세요."
            onChange={handleInputValue("nickname")}
          />
          <Button
            className="w-36 h-12 btn-green mx-3 text-center rounded-3xl  text-white"
            type="submit"
            onClick={handleSignup}
          >
            회원가입
          </Button>
        </form>
      </div>
    </div>,

    document.getElementById("modal"),
  );
};

export default ModalSignUp;
