import React, { useState, useRef } from "react";
import ReactDom from "react-dom";
import axios from "axios";
import Button from "../components/button";
import logo from "../img/Logo.png";
import { XIcon } from "@heroicons/react/solid";
import { useForm } from "react-hook-form";

const localURL = process.env.REACT_APP_LOCALSERVER_URL;

const ModalSignUp = ({ modalOpen, closeModal }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = useRef();
  password.current = watch("password");

  const onSubmit = data => {
    console.log(data);
  };
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
  });

  const handleInputValue = key => e => {
    setUserInfo({ ...userInfo, [key]: e.target.value });
  };

  const handleSignup = () => {
    const { email, password, passwordConfirm, nickname } = userInfo;
    console.log("click");

    console.log("test click");
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
        alert("회원가입 되었습니다! 로그인하세요");
        closeModal();
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
        <img className="w-52 my-3" src={logo} alt="err"></img>
        <form
          className="flex flex-col justify-center text-center items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            name="email"
            type="email"
            className="w-72  h-10 bg-white text-center rounded-3xl outline md:outline-2 placeholder:text-grey-70"
            placeholder="Email을 입력하세요."
            onChange={handleInputValue("email")}
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && (
            <p className="text-xs text-red"> 필수 입력 사항입니다.</p>
          )}
          <input
            name="password"
            type="password"
            className="w-367 h-10   bg-white text-center rounded-3xl my-3 outline md:outline-2 placeholder:text-grey-70"
            placeholder="비밀번호를 입력하세요."
            onChange={handleInputValue("password")}
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && errors.password.type === "required" && (
            <p className="text-xs text-red">필수 입력 사항입니다.</p>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <p className="text-xs text-red">
              비밀번호는 6글자 이상이어야 합니다.
            </p>
          )}
          <input
            name="passwordConfirm"
            type="password"
            className="w-367 h-10   bg-white text-center rounded-3xl mb-3 outline md:outline-2 placeholder:text-grey-70"
            placeholder="비밀번호를 다시 입력하세요."
            onChange={handleInputValue("passwordConfirm")}
            {...register("passwordConfirm", {
              required: true,
              validate: value => value === password.current,
            })}
          />
          {errors.passwordConfirm &&
            errors.passwordConfirm.type === "required" && (
              <p className="text-xs text-red">필수 입력 사항입니다.</p>
            )}
          {errors.passwordConfirm &&
            errors.passwordConfirm.type === "validate" && (
              <p className="text-xs text-red">비밀번호가 일치하지 않습니다.</p>
            )}
          <input
            name="nickname"
            type="text"
            className="w-72  h-10 bg-white text-center rounded-3xl outline md:outline-2 placeholder:text-grey-70"
            placeholder="닉네임을 입력하세요."
            onChange={handleInputValue("nickname")}
            {...register("nickname", { required: true, maxLength: 10 })}
          />
          {errors.nickname && errors.nickname.type === "required" && (
            <p className="text-xs text-red">필수 입력 사항입니다.</p>
          )}
          {errors.nickname && errors.nickname.type === "maxLength" && (
            <p className="text-xs text-red">최대 10글자 입니다.</p>
          )}
          <input
            type="submit"
            className="w-36 h-12 btn-green mx-3 my-3 text-center rounded-3xl  text-white"
            onClick={handleSignup}
          />
          {/* <Button
            type="submit"
            className="w-36 h-12 btn-green mx-3 my-3 text-center rounded-3xl  text-white"
            onClick={handleSignup}
          >
            회원가입
          </Button> */}
        </form>
      </div>
    </div>,
    document.getElementById("modal"),
  );
};

export default ModalSignUp;
