import React, { useState } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Button from "../components/button";
import axios from "axios";
import Carousel from "../components/carousel";
import logo from "../img/Logo.png";
import ModalLogin from "../modals/modalLogin";
import ModalSignUp from "../modals/modalSignUp";
import KakaoOauth from "../components/kakaoOauth";
import Home from "./home";
import action from "../redux/action";
import { connect } from "react-redux";

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
  const history = useHistory();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);

  const google = () => {
    window.open(
      process.env.REACT_APP_DEPLOYSERVER_URL ||
        process.env.REACT_APP_LOCALSERVER_URL + "/auth/google",
      "_self"
    );
  };

  const kakao = () => {
    window.open(
      process.env.REACT_APP_DEPLOYSERVER_URL ||
        process.env.REACT_APP_LOCALSERVER_URL + "/auth/kakao",
      "_self"
    );
  };

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
            <button onClick={google} className="btn btn-green">
              구글 회원가입
            </button>
            <button onClick={kakao} className="btn btn-green">
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
