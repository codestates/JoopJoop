import React, { useState } from "react";
import axios from "axios";
import ReactDom from "react-dom";
import Button from "../components/button";
import logo from "../img/Logo.png";
import { XIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

const ModalLogin = ({ modalOpen, closeModal, isLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginRequestHandler = () => {
    // console.log(email, password)
    if (email && password) {
      axios
        .post(
          "http://localhost:80/auth/login",
          { email, password },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          },
        )
        .then(res => {
          console.log(res);
        })
        .then(() => {
          closeModal();
          isLogin();
        });
    }
  };

  if (!modalOpen) return null;
  return ReactDom.createPortal(
    <div className="container-modal">
      <div className="modal-normal gap-3">
        <div className="relative w-full">
          <button
            className="absolute left-[91.5%] bottom-2"
            onClick={closeModal}
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <img className="w-52" src={logo} alt="err"></img>
        <div className="w-10 h-2"></div>
        <input
          type="email"
          className="input-ring-green w-[297px] h-[2.9rem] rounded-3xl text-center placeholder:text-grey-70"
          placeholder="Email을 입력하세요."
          onChange={event => setEmail(event.target.value)}
        />
        <div className="">
          <input
            type="password"
            className="input-ring-green w-[297px] h-[2.9rem] rounded-3xl text-center placeholder:text-grey-70"
            placeholder="비밀번호를 입력하세요."
            onChange={event => setPassword(event.target.value)}
          />
        </div>
        <Link to="/home" className="">
          <div className="">
            <Button
              className="w-[8.4rem] h-[2.9rem] btn-green rounded-3xl text-center outline text-white"
              onClick={loginRequestHandler}
            >
              로그인
            </Button>
          </div>
        </Link>

        <div className="flex gap-2 items-center">
          <div className="w-48">
            <hr className="text-grey-80" />
          </div>
          <p className="text-grey-80">or</p>
          <div className="text-grey-80 w-48">
            <hr />
          </div>
        </div>
        <div className="flex flex-row justify-center items-start gap-5">
          <button className=" w-40 h-[2.9rem] bg-blue text-center rounded-3xl text-white">
            Google 로그인
          </button>
          <button className="w-40 h-[2.9rem] bg-yellow text-center rounded-3xl text-white">
            Kakao 로그인
          </button>
        </div>
        <div className="w-10 h-2"></div>
        <button className="text-xs flex items-center text-center">
          비밀번호를 잊으셨나요?
        </button>
        <div className="flex flex-row justify-center items-center gap-5">
          <button className="text-xs flex items-center text-center">
            계정이 없으신가요?
          </button>
          <button className="text-xs flex items-center text-center">
            회원가입
          </button>
        </div>
      </div>
    </div>,

    document.getElementById("modal"),
  );
};

export default ModalLogin;
