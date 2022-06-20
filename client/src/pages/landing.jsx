import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Button from "../components/button";
import Carousel from "../components/carousel";
import MobileCarousel from "../components/carousel_mobile";
import logo from "../img/Logo.png";
import ModalLogin from "../modals/modalLogin";
import ModalSignUp from "../modals/modalSignUp";
import Home from "./home";
import action from "../redux/action";
import { connect } from "react-redux";
import { ScrollToLogin } from "../components/scrollToLogin";

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setIsLogin: (boolean) => dispatch(action.setIsLogin(boolean)),
  };
};

const Landing = ({ onLogin, isLogin, guestRegisterLogin }) => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);

  const google = () => {
    window.open(
      process.env.REACT_APP_DEPLOYSERVER_URL ||
        process.env.REACT_APP_LOCALSERVER_URL + "/auth/google",
      "_self",
    );
  };

  const kakao = () => {
    window.open(
      process.env.REACT_APP_DEPLOYSERVER_URL ||
        process.env.REACT_APP_LOCALSERVER_URL + "/auth/kakao",
      "_self",
    );
  };

  return (
    <BrowserRouter>
      {isLogin ? (
        <Switch>
          <Route path="/home" exact component={Home} />
        </Switch>
      ) : (
        <div className="flex flex-col md:flex-row justify-start items-center md:justify-end bg-grey-10 bg-opacity-25">
          <div className="relative w-[138.3vh] h-[100vh] md:h-[102vh] bg-white">
            <div className="hidden md:flex">
              <Carousel className="" />
            </div>
            <div className="flex md:hidden">
              <MobileCarousel className="" />
            </div>
          </div>
          <div className="flex w-full h-[100vh]">
            <div
              id="login"
              className="w-full md:w-[30rem] h-full flex flex-col justify-center items-center space-y-2 md:space-y-4 py-8"
            >
              <div className="space-y-6 mb-2">
                <img src={logo} alt="logo" />
                <div className="font-semibold text-green-100 text-center text-3xl">
                  지금 시작하세요!
                </div>
              </div>

              <button
                onClick={() => {
                  google();
                }}
                className="btn btn-green"
              >
                구글 회원가입
              </button>
              <button
                onClick={() => {
                  kakao();
                }}
                className="btn btn-green"
              >
                카카오 회원가입
              </button>
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
              <Button
                children={"게스트 로그인"}
                onClick={() => {
                  guestRegisterLogin();
                }}
              ></Button>
            </div>
            <div className="flex md:hidden">
              <ScrollToLogin />
            </div>
          </div>
          <ModalLogin
            modalOpen={loginModalOpen}
            closeModal={() => setLoginModalOpen(false)}
            onLogin={onLogin}
            google={google}
            kakao={kakao}
            setSignUpModalOpen={setSignUpModalOpen}
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

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
