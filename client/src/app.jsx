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
    userId: state.userId,
    token: state.accessToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserId: (id) => dispatch(action.setUserId(id)),
    setIsLogin: (boolean) => dispatch(action.setIsLogin(boolean)),
    setEmail: (email) => dispatch(action.setEmail(email)),
    setNickname: (nickname) => dispatch(action.setNickname(nickname)),
    setAccessToken: (accessToken) =>
      dispatch(action.setAccessToken(accessToken)),
    setIsLoading: (boolean) => dispatch(action.setIsLoading(boolean)),
    setGatherings: (gathering) => dispatch(action.setGatherings(gathering)),
  };
};

function App({
  isLogin,
  setIsLogin,
  setEmail,
  setNickname,
  setUserId,
  setAccessToken,
  userId,
  token,
  setIsLoading,
  setGatherings,
}) {
  const onLogin = (email, password) => {
    console.log("로그인요청");
    const data = {
      email,
      password,
    };
    axios
<<<<<<< HEAD
      .post(process.env.REACT_APP_LOCALSERVER_URL + "/auth/login", data, {
=======
      .post("http://localhost:80/auth/login", data, {
>>>>>>> 403d60bf (fix loginHandler Function)
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        HttpOnly: true,
        samesite: "Secure",
      })
      .then((res) => {
        onLoginSuccess(res);
        console.log(res);
      })
      .catch((error) => {
        console.log("onLogin 함수");
      });
  };

  const onLogout = (e) => {
    axios
<<<<<<< HEAD
      .get(process.env.REACT_APP_LOCALSERVER_URL + "/auth/logout", {
<<<<<<< HEAD
=======
      .get("http://localhost:80/auth/logout", {
>>>>>>> 403d60bf (fix loginHandler Function)
=======
>>>>>>> 580291bd (try edit profileImg)
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        HttpOnly: true,
        samesite: "Secure",
      })
      .then((res) => {
        console.log("로그아웃 완료");
<<<<<<< HEAD
        setIsLogin(false);
<<<<<<< HEAD

        console.log("로그아웃 완료");

        setIsLogin(false);
=======
>>>>>>> 403d60bf (fix loginHandler Function)
=======
>>>>>>> 580291bd (try edit profileImg)
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onSilentRefresh = () => {
    axios
      .post(
<<<<<<< HEAD
        process.env.REACT_APP_LOCALSERVER_URL + "/auth/refresh",
=======
        "http://localhost:80/auth/refresh",
>>>>>>> 403d60bf (fix loginHandler Function)
        { data: "refresh" },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        onLoginSuccess(res);
      })
<<<<<<< HEAD
<<<<<<< HEAD
      .catch((error) => {
<<<<<<< HEAD
        console.log("refresh 실패");
<<<<<<< HEAD

=======
>>>>>>> 403d60bf (fix loginHandler Function)
=======
>>>>>>> 580291bd (try edit profileImg)
=======
      .catch(error => {
>>>>>>> d3c5e061 (fix home page)
=======
      .catch((error) => {
>>>>>>> 3a900fae (fix)
        setIsLogin(false);
      });
  };

  const onLoginSuccess = (res) => {
    const { accessToken, email, nickname, _id, profileImg } = res.data;
    // console.log("onloginsuccess");
    //login state true
    getGatherings();
    setIsLogin(true);
    setEmail(email);
    setNickname(nickname);
    setUserId(_id);
    setAccessToken(accessToken);
    // accessToken 설정
    // axios.defaults.headers.common["token"] = token;
  };

  const getGatherings = () => {
    axios
      .get(process.env.REACT_APP_LOCALSERVER_URL + "/gatherings", {
        withCredentials: true,
      })
      .then((data) => {
        setGatherings([...data.data]);
      });
  };

  useEffect(() => {
    setIsLogin(false);
    onSilentRefresh();
  }, []);

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
