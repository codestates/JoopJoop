import React from "react";
import KakaoLogin from "../kakaoOauth";
import Button from "../button";
import { KAKAO_AUTH_URL } from "../auth/Oauth";
import axios from "axios";

const oAuthLoginHandler = async data => {
  let request = {
    oAuthId: data.profile.id,
  };
  console.log(request);
  await axios.post("http://localhost:5000/auth/kakao", {
    data: request,
    withCredentials: true,
  });
};

const Mypage = loginHandler => {
  return (
    <div>
      <div>
        <img src="" alt="logo" />
        <div>지금 시작하세요!</div>
      </div>
      <div className="flex flex-col gap-2">
        <Button children={"구글 회원가입"}></Button>
        <Button children={"카카오 회원가입"}></Button>
        <div>또는</div>
        <Button children={"이메일 회원가입"}></Button>
        <div>회원이신가요?</div>
        <KakaoLogin
          children={"로그인"}
          oAuthLoginHandler={oAuthLoginHandler}
        ></KakaoLogin>
        <Button children={"게스트 로그인"}></Button>
      </div>
    </div>
  );
};

export default Mypage;
