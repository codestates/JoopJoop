import React, { useState } from "react";
import axios from "axios";

const localURL = "http://localhost:80";

const ModalSignUp = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    nickname: "",
  });

  console.log(userInfo);

  const handleInputValue = (key) => (e) => {
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
        }
      )
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div
      className="w-500 h-647 flex flex-col justify-center items-center"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="relative left-48">
        <button>X</button>
      </div>
      <div className="p-10">
        <img className="" src="/img/LOGO.jpg"></img>
      </div>
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
        <button
          className="w-36 h-12 bg-green-80 mx-3 text-center rounded-3xl  text-white"
          type="submit"
          onClick={handleSignup}
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default ModalSignUp;
