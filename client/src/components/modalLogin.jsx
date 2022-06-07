import React, { useState } from "react";
import axios from "axios";

const ModalLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginRequestHandler = () => {
    axios
      .post(
        "http://localhost:80/auth/login",
        { email, password },
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
    <div className="w-500 h-647 flex flex-col justify-center items-center">
      <div className="relative left-48">
        <button>X</button>
      </div>
      <div className="p-10">
        <img className="" src="/img/LOGO.jpg"></img>
      </div>
      <div className="">
        <input
          type="email"
          className="w-80 h-12 bg-white text-center rounded-3xl outline md:outline-2 placeholder:text-grey-70"
          placeholder="Email을 입력하세요."
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="">
        <input
          type="password"
          className="w-80 h-12 bg-white text-center rounded-3xl my-3 outline md:outline-2 placeholder:text-grey-70"
          placeholder="비밀번호를 입력하세요."
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className="">
        <button
          className="w-36 h-12 bg-green-80 text-center rounded-3xl outline md:outline-2 text-white"
          onClick={loginRequestHandler}
        >
          로그인
        </button>
      </div>
      <div className="flex my-3">
        <div className="w-48">
          <hr />
        </div>
        <p className="relative bottom-3">or</p>
        <div className="w-48">
          <hr />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="">
          <button className="w-36 h-12 bg-blue mx-3 text-center rounded-3xl   text-white">
            Google 로그인
          </button>
        </div>
        <div className="">
          <button className="w-36 h-12 bg-yellow mx-3 text-center rounded-3xl  text-white">
            Kakao 로그인
          </button>
        </div>
      </div>
      <button className="text-xs my-3">비밀번호를 잊으셨나요?</button>
      <div className="">
        <button className="text-xs mx-4">계정이 없으신가요?</button>
        <button className="text-xs mr-6">회원가입</button>
      </div>
    </div>
  );
};

export default ModalLogin;
