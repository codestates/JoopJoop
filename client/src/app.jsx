import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Chat from "./pages/chat";
import Community from "./pages/community";
import Home from "./pages/home";
import Schedule from "./pages/schedule";
import Navbar from "./components/navbar";
import SearchGathering from "./components/search_gathering";
import Footer from "./components/footer";
import "./index.css";
import Dropdown from "./components/dropdown";
import ModalLg from "./components/modalLg";
import ModalSm from "./components/modalSm";
import ModalLogin from "./components/modalLogin";
import ModalConfirmSignOut from "./components/modalConfirmSignOut";
import ModalSignUp from "./components/modalSignUp";
import Search_gathering from "./components/search_gathering";

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

  return (
    <>
      <BrowserRouter>
        <Navbar toggle={toggle} />
        <Dropdown isOpen={isOpen} toggle={toggle} />
        <ModalSignUp />
        <Switch>
          <Route path={["/", "/home"]} exact component={Home} />
          <Route path="/schedule" component={Schedule} />
          <Route path="/chat" component={Chat} />
          <Route path="/community" component={Community} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
