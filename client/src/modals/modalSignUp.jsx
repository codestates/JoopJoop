import React, { useState, useRef } from "react";
import ReactDom from "react-dom";
import axios from "axios";
import Button from "../components/button";
import logo from "../img/Logo.png";
import { XIcon } from "@heroicons/react/solid";
import { useForm } from "react-hook-form";
import { lightFormat } from "date-fns";
import KakaoLogin from "react-kakao-login";

const localURL = "http://localhost:5000";

const ModalSignUp = ({ modalOpen, closeModal }) => {
  const [verifyNumber, setVerifyNumber] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();
  const password = useRef();
  password.current = watch("password");

  const onSubmit = (data) => {
    const { email, password, nickname } = data;
    console.log(data);
    console.log(verifyEmail);
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
        alert("회원가입 되었습니다! 로그인하세요");
        closeModal();
      });
  };

  const verifyEmail = (email) => {
    axios
      .post(
        `${localURL}/mail`,
        {
          email: email,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((res) => {
        const verifyNumber = res.data.authnum;
        setVerifyNumber(verifyNumber);
      })
      .catch((err) => console.log(err));
  };

  if (!modalOpen) return null;
  return ReactDom.createPortal(
    <div className="container-modal">
      <div className="modal-normal gap-3" onSubmit={(e) => e.preventDefault()}>
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
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && (
            <p className="text-xs text-red"> 필수 입력 사항입니다.</p>
          )}
          <button
            type="button"
            onClick={() => {
              const email = getValues("email");
              verifyEmail(email);
            }}
          >
            이메일 인증
          </button>
          <input
            name="verifyNumber"
            type="password"
            className="w-30 h-6   bg-white text-center rounded-3xl my-3 outline md:outline-2 placeholder:text-grey-70"
            placeholder="인증번호를 입력하세요."
            {...register("verifyNumber", { required: true })}
          />
          {errors.verifyNumber && (
            <p className="text-xs text-red"> 필수 입력 사항입니다.</p>
          )}
          <button
            type="button"
            onClick={() => {
              const inputVerifyNumber = getValues("verifyNumber");
              if (inputVerifyNumber === verifyNumber) {
                const target = document.querySelector(".verified");
                target.disabled = false;
                alert("인증 번호가 일치합니다. 계속해서 회원가입 진행해주세요");
              } else {
                alert("인증번호를 다시 확인해주세요");
              }
            }}
          >
            확인
          </button>
          <input
            disabled
            name="password"
            type="password"
            className="verified w-367 h-10   bg-white text-center rounded-3xl my-3 outline md:outline-2 placeholder:text-grey-70"
            placeholder="비밀번호를 입력하세요."
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
            className=" w-367 h-10  bg-white text-center rounded-3xl mb-3 outline md:outline-2 placeholder:text-grey-70"
            placeholder="비밀번호를 다시 입력하세요."
            {...register("passwordConfirm", {
              required: true,
              validate: (value) => value === password.current,
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
            className=" w-72  h-10 bg-white text-center rounded-3xl outline md:outline-2 placeholder:text-grey-70"
            placeholder="닉네임을 입력하세요."
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
            value="회원가입"
            className="w-36 h-12 btn-green mx-3 my-3 text-center rounded-3xl  text-white"
            onClick={onSubmit}
          />
        </form>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default ModalSignUp;
