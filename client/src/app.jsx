import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar";
import Chat from "./pages/chat";
import Community from "./pages/community";
import Home from "./pages/home";
import Schedule from "./pages/schedule";
import Footer from "./components/footer";
import Landing from "./pages/landing";
import "./index.css";
import Dropdown from "./components/dropdown";
import axios from "axios";
import { connect } from "react-redux";
import action from "./redux/action";
import Mypage from "./pages/mypage";

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

function App({ isLogin, setIsLogin }) {
  const onLogin = (email, password) => {
    console.log("로그인요청");
    const data = {
      email,
      password,
    };
    axios
      .post(process.env.REACT_APP_LOCALSERVER_URL + "/auth/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        HttpOnly: true,
        samesite: "Secure",
      })
      .then((res) => {
        onLoginSuccess(res);
      })
      .catch((error) => {
        console.log("onLogin 함수");
      });
  };

  const onLogout = (e) => {
    axios
      .get(process.env.REACT_APP_LOCALSERVER_URL + "/auth/logout", {

        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        HttpOnly: true,
        samesite: "Secure",
      })
      .then((res) => {
        console.log("로그아웃 완료");
        setIsLogin(false);

      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onSilentRefresh = () => {
    console.log(process.env.REACT_APP_LOCALSERVER_URL);
    axios
      .post(
        process.env.REACT_APP_LOCALSERVER_URL + "/auth/refresh",
        { data: "refresh" },

        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        onLoginSuccess(res);
        console.log("resfresh 성공");
      })
      .catch((error) => {
        console.log("refresh 실패");
        setIsLogin(false);
      });
  };

  const onLoginSuccess = (res) => {
    const { accessToken } = res.data;
    // console.log("onloginsuccess");
    // console.log(accessToken);
    //login state true
    setIsLogin(true);
    // accessToken 설정
    axios.defaults.headers.common["token"] = accessToken;
    // accessToken 만료하기 1분 전에 로그인 연장
    // setTimeout(onSilentRefresh, JWT_EXPIRRY_TIME - 60000);
    // getGatherings(accessToken);
  };

  //! gatherings 정보가져오기, 분리 필요
  // const getGatherings = () => {
  //   axios
  //     .get("http://localhost:80/gatherings", {
  //       withCredentials: true,
  //       token: accessToken,
  //     })
  //     .then(data => console.log(data));
  // };

  const componentDidMount = () => {
    onSilentRefresh();
  };
  componentDidMount();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const hideMenu = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
        console.log("i resized");
      }
    };
    window.addEventListener("resize", hideMenu);
    return () => {
      window.removeEventListener("resize", hideMenu);
    };
  });

  return (
    <>
      <BrowserRouter>
        <Dropdown isOpen={isOpen} toggle={toggle} logout={onLogout} />
        {isLogin ? <Navbar toggle={toggle} /> : null}
        {isLogin ? (
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/home" component={Home} />
            <Route path="/schedule" component={Schedule} />
            <Route path="/chat" component={Chat} />
            <Route path="/community" component={Community} />
            <Route path="/mypage" component={Mypage} />
          </Switch>
        ) : (
          <Landing onLogin={onLogin} />
        )}
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
