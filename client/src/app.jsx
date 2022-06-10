import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Chat from "./pages/chat";
import Community from "./pages/community";
import Home from "./pages/home";
import Schedule from "./pages/schedule";
import Footer from "./components/footer";
import Landing from "./pages/landing";
import "./index.css";
import Dropdown from "./components/dropdown";
import axios from "axios";

function App() {
  const onLogin = (email, password) => {
    console.log("로그인요청");
    const data = {
      email,
      password,
    };
    axios
      .post("http://localhost:80/auth/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        HttpOnly: true,
        samesite: "Secure",
      })
      .then(res => {
        onLoginSuccess(res);
      })
      .catch(error => {
        console.log("onLogin 함수");
      });
  };

  const onLoginSuccess = res => {
    const { accessToken } = res.data;
    // accessToken 설정
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    // accessToken 만료하기 1분 전에 로그인 연장
    // setTimeout(onSilentRefresh, JWT_EXPIRRY_TIME - 60000);
  };

  const onSilentRefresh = () => {
    console.log("silent");
    axios
      .post(
        "http://localhost:80/auth/refresh",
        { data: "refresh" },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      )
      .then(res => {
        console.log(res);
        // onLoginSuccess(res);
      })
      .catch(error => {
        console.log("refresh 실패");
      });
  };

  const componentDidMount = () => {
    onSilentRefresh();
  };
  componentDidMount();

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

  return (
    <>
      <BrowserRouter>
        <Dropdown isOpen={isOpen} toggle={toggle} />
        {isLogin ? (
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/home" exact component={Home} />
            <Route path="/schedule" component={Schedule} />
            <Route path="/chat" component={Chat} />
            <Route path="/community" component={Community} />
          </Switch>
        ) : (
          <Landing onLogin={onLogin} />
        )}
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
