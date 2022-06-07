import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Chat from "./pages/chat";
import Community from "./pages/community";
import Home from "./pages/home";
import Schedule from "./pages/schedule";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Landing from "./pages/landing";
import "./index.css";
import Dropdown from "./components/dropdown";
import Mypage from "./components/mypage";
import ModalSignUp from "./components/modalSignUp";
import ModalLogin from "./components/modalLogin";
import Kakao from "./components/kakaoOauth";
import axios from "axios";


function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState("");

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

  const loginHandler = data => {
    setIsLogin(true);
    issueAccessToken(data.data.accessToken);
  };

  const issueAccessToken = token => {
    setAccessToken(token);
  };

  const oAuthLoginHandler = async data => {
    console.log(isLogin);
    let request = {
      oAuthId: data.profile.id,
    };
    console.log(request);
    await axios
      .post("http://localhost:80/auth/kakao", {
        data: request,
        withCredentials: true,
      })
      .then(res => {
        console.log(res);
        loginHandler(res);
      });
  };

  return (
    <>
      <BrowserRouter>
        <Dropdown isOpen={isOpen} toggle={toggle} />
<feature/signup
        {/* {isLogin ? (
          <Mypage
            accessToken={accessToken}
            issueAccessToken={issueAccessToken}
          ></Mypage>

        <Kakao oAuthLoginHandler={oAuthLoginHandler} />
        {isLogin ? (
          // <Mypage
          //   accessToken={accessToken}
          //   issueAccessToken={issueAccessToken}
          // ></Mypage>
          <div>login complete</div>

        ) : (
          <Landing loginHandler={loginHandler} />
        )} */}
        <ModalLogin />
        <Switch>
          <Route path={["/", "/home"]} exact component={Home} />
          <Route path="/schedule" component={Schedule} />
          <Route path="/chat" component={Chat} />
          <Route path="/community" component={Community} />
        </Switch>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
