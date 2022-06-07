import React, { useState } from "react";
import axios from "axios";

const localURL = "http://localhost:80";

const ModalSignUp = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
  });
  const [errMsg, setErrMsg] = useState("");

  const handleInputValue = (key) => (e) => {
    setUserInfo({ ...userInfo, [key]: e.target.value });
  };
  const handleSignup = () => {
    const { email, password, passwordConfirm, nickname } = userInfo;

    console.log(userInfo);

    if (!email || !password || !passwordConfirm || !nickname) {
      setErrMsg("모든 항목이 필수입니다.");
    } else if (password !== passwordConfirm) {
      setErrMsg("비밀번호가 다릅니다.");
    } else {
      axios.post(
        `${localURL}/auth/signUp`,
        {
          email: email,
          password: password,
          passwordConfirm: passwordConfirm,
          nickname: nickname,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
    }
  };
  return (
    <div className="w-500 h-647 flex flex-col justify-center items-center">
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
          type="password"
          className="w-367 h-10  bg-white text-center rounded-3xl mb-3 outline md:outline-2 placeholder:text-grey-70"
          placeholder="비밀번호를 한번 더 입력하세요."
          onChange={handleInputValue("passwordConfirm")}
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
