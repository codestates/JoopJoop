import React, { useState, useRef, useEffect } from "react";
import ReactDom from "react-dom";
import axios from "axios";
import Button from "../components/button";
import logo from "../img/Logo.png";
import { XIcon } from "@heroicons/react/solid";
import { useForm } from "react-hook-form";
import { lightFormat } from "date-fns";
import KakaoLogin from "react-kakao-login";

const ModalSignUp = ({ modalOpen, closeModal }) => {
  const [verifyNumber, setVerifyNumber] = useState("");

  useEffect(() => {
    if (modalOpen) {
      document.body.style.cssText = `
        position: fixed; 
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = "";
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      };
    }
  }, [modalOpen]);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    reset,
    formState: { errors },
  } = useForm();
  const password = useRef();
  password.current = watch("password");

  const onSubmit = (data) => {
    const { email, password, nickname } = data;
    axios
      .post(
        process.env.REACT_APP_DEPLOYSERVER_URL ||
          process.env.REACT_APP_LOCALSERVER_URL + "/auth/signup",
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
      })
      .catch((err) => err);
  };

  const verifyEmail = (email) => {
    axios
      .post(
        process.env.REACT_APP_DEPLOYSERVER_URL ||
          process.env.REACT_APP_LOCALSERVER_URL + "/mail",
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
      .catch((err) => err);
  };

  if (!modalOpen) return null;
  return ReactDom.createPortal(
    <div className="container-modal">
      <div className="modal-normal gap-3" onSubmit={(e) => e.preventDefault()}>
        <div className="relative w-full">
          <button
            className="absolute left-[91.5%] bottom-2"
            onClick={() => {
              closeModal();
              window.location.reload();
            }}
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <form
          className="flex flex-col justify-center text-center items-center "
          onSubmit={handleSubmit(onSubmit)}
        >
          <img className="w-40 mb-1" src={logo}></img>
          <input
            name="email"
            type="email"
            className="w-[340px] h-[36px] input-ring-green rounded-3xl text-center "
            placeholder="Email을 입력하세요."
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          <div className="w-40 h-4 my-1">
            {errors.email && (
              <p className="text-xs text-red"> 필수 입력 사항입니다.</p>
            )}
          </div>
          <button
            className="mt-1 bg-grey-10 text-sm rounded-xl w-[6rem] "
            type="button"
            onClick={() => {
              const email = getValues("email");
              const verify = new Promise(() => verifyEmail(email));
              verify.then(() => alert("인증 번호가 발송되었습니다."));
            }}
          >
            이메일 인증
          </button>
          <input
            name="verifyNumber"
            type="password"
            className="w-[340px] h-[36px] my-1 input-ring-green rounded-3xl text-center"
            placeholder="인증번호를 입력하세요."
            {...register("verifyNumber", { required: true })}
          />
          <div className="w-40 h-4">
            {errors.verifyNumber && (
              <p className="text-xs text-red "> 필수 입력 사항입니다.</p>
            )}
          </div>
          <button
            className="my-1 bg-grey-10 text-sm rounded-xl w-[6rem]"
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
            name="nickname"
            type="text"
            className="w-[340px] h-[36px] my-1 input-ring-green rounded-3xl text-center"
            placeholder="닉네임을 입력하세요."
            {...register("nickname", { required: true, maxLength: 10 })}
          />
          <div className="w-40 h-4">
            {errors.nickname && errors.nickname.type === "required" && (
              <p className="text-xs text-red ">필수 입력 사항입니다.</p>
            )}
            {errors.nickname && errors.nickname.type === "maxLength" && (
              <p className="text-xs text-red">최대 10글자 입니다.</p>
            )}
          </div>
          <input
            disabled
            name="password"
            type="password"
            className="verified my-1 w-[340px] h-[36px] input-ring-green rounded-3xl text-center"
            placeholder="비밀번호를 입력하세요."
            {...register("password", { required: true, minLength: 6 })}
          />
          <div className="w-40 h-4">
            {errors.password && errors.password.type === "required" && (
              <p className="text-xs text-red">필수 입력 사항입니다.</p>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <p className="text-xs text-red ">
                비밀번호는 6글자 이상이어야 합니다.
              </p>
            )}
          </div>
          <input
            name="passwordConfirm"
            type="password"
            className=" w-[340px] h-[36px] my-1 input-ring-green rounded-3xl text-center"
            placeholder="비밀번호를 다시 입력하세요."
            {...register("passwordConfirm", {
              required: true,
              validate: (value) => value === password.current,
            })}
          />
          <div className="w-40 h-4">
            {errors.passwordConfirm &&
              errors.passwordConfirm.type === "required" && (
                <p className="text-xs text-red">필수 입력 사항입니다.</p>
              )}
            {errors.passwordConfirm &&
              errors.passwordConfirm.type === "validate" && (
                <p className="text-xs text-red ">
                  비밀번호가 일치하지 않습니다.
                </p>
              )}
          </div>

          <input
            type="submit"
            value="회원가입"
            className="w-36 h-12 btn-green my-2  text-center rounded-3xl  text-white"
            onClick={() => {
              onSubmit();
            }}
          />
        </form>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default ModalSignUp;
