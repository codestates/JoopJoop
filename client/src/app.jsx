<<<<<<< HEAD
import React, { useEffect, useState } from "react";
=======
import React, { useState } from "react";
>>>>>>> 8b72148 (add kakaoOauth, fix landing, gitignore)
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Chat from "./components/pages/chat";
import Community from "./components/pages/community";
import Home from "./components/pages/home";
import Schedule from "./components/pages/schedule";
import Navbar from "./components/navbar";
<<<<<<< HEAD
<<<<<<< HEAD
import SearchGathering from "./components/search_gathering";
=======
import Button from "./components/button";
import Card from "./components/card_gathering";
import Search from "./components/search_gathering";
>>>>>>> fix card_gathering, footer
=======
>>>>>>> 8b72148 (add kakaoOauth, fix landing, gitignore)
import Footer from "./components/footer";
import Landing from "./components/pages/landing";
import "./index.css";
<<<<<<< HEAD
import Dropdown from "./components/dropdown";
import ModalLg from "./components/modalLg";
import ModalSm from "./components/modalSm";
import ModalLogin from "./components/modalLogin";
import ModalConfirmSignOut from "./components/modalConfirmSignOut";

function App() {
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
=======
import Mypage from "./components/mypage";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  const loginHandler = data => {
    setIsLogin(true);
    issueAccessToken(data.data.accessToken);
  };

  const issueAccessToken = token => {
    setAccessToken(token);
  };
>>>>>>> 8b72148 (add kakaoOauth, fix landing, gitignore)

  return (
    <>
      <BrowserRouter>
<<<<<<< HEAD
        <Navbar toggle={toggle} />
        <Dropdown isOpen={isOpen} toggle={toggle} />
=======
        <Navbar />
        {isLogin ? (
          <Mypage
            accessToken={accessToken}
            issueAccessToken={issueAccessToken}
          ></Mypage>
        ) : (
          <Landing loginHandler={loginHandler} />
        )}
>>>>>>> 8b72148 (add kakaoOauth, fix landing, gitignore)
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
