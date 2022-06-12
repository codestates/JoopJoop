import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Button from "../components/button";
import axios from "axios";
import Carousel from "../components/carousel";
import logo from "../img/Logo.png";
import ModalLogin from "../modals/modalLogin";
import ModalSignUp from "../modals/modalSignUp";
import KakaoOauth from "../components/kakaoOauth";
import Home from "./home";

import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    isLogin: state.isLogin,
  };
};

const oAuthLoginHandler = async data => {
  let request = {
    oAuthId: data.profile.id,
  };
  await axios
    .post("http://localhost:80/auth/kakao", {
      data: request,
      withCredentials: true,
    })
    .then(data => {
      console.log(data);
    });
};

const Landing = ({ onLogin, isLogin }) => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);

  return (
    <BrowserRouter>
      {isLogin ? (
        <Switch>
          <Route path="/home" exact component={Home} />
        </Switch>
      ) : (
        <div className="flex flex-row justify-center items-center">
          <div>
            <Carousel className="flex" />
          </div>
          <div className="w-full flex flex-col place-content-center items-center gap-4">
            <img src={logo} alt="logo" />
            <div className="h-1"></div>
            <div className="font-normal text-center text-3xl">
              지금 시작하세요!
            </div>
            <Button children={"구글 회원가입"}></Button>
            <Button children={"카카오 회원가입"}></Button>
            <div className="text-center">또는</div>
            <Button
              className="btn btn-green"
              children={"이메일 회원가입"}
              onClick={() => setSignUpModalOpen(true)}
            />
            <div className="text-center">회원이신가요?</div>
            <Button
              className="btn btn-green"
              children={"로그인"}
              onClick={() => setLoginModalOpen(true)}
            />
            <Button children={"게스트 로그인"}></Button>
          </div>
          <ModalLogin
            modalOpen={loginModalOpen}
            closeModal={() => setLoginModalOpen(false)}
            onLogin={onLogin}
          />
          <ModalSignUp
            modalOpen={signUpModalOpen}
            closeModal={() => setSignUpModalOpen(false)}
          />
        </div>
      )}
    </BrowserRouter>
  );
};

export default connect(mapStateToProps, null)(Landing);
