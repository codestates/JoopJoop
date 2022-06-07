import React from "react";
import KakaoLogin from "../components/kakaoOauth";
import Button from "../components/button";
import axios from "axios";
import Carousel from "../components/carousel";
import logo from "../img/Logo.png";

const oAuthLoginHandler = async (data) => {
  let request = {
    oAuthId: data.profile.id,
  };
  console.log(request);
  await axios.post("http://localhost:80/auth/kakao", {
    data: request,
    withCredentials: true,
  });
};

const Mypage = (loginHandler) => {
  return (
    <div className="flex flex-row justify-center items-center">
      <div>
        <Carousel className="flex" />
      </div>
      <div className="w-full flex flex-col place-content-center items-center gap-4">
        <img src={logo} alt="logo" />
        <div className="h-1"></div>
        <div className="font-normal text-center text-3xl">지금 시작하세요!</div>
        <Button children={"구글 회원가입"}></Button>
        <Button children={"카카오 회원가입"}></Button>
        <div className="text-center">또는</div>
        <Button children={"이메일 회원가입"}></Button>
        <div className="text-center">회원이신가요?</div>
        <Button children={"로그인"}></Button>
        <Button children={"게스트 로그인"}></Button>
      </div>
    </div>
  );
};

export default Mypage;
