import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Chat from './components/pages/chat';
import Community from './components/pages/community';
import Home from './components/pages/home';
import Schedule from './components/pages/schedule';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Landing from './components/pages/landing';
import './index.css';
import Dropdown from './components/dropdown';
import Mypage from './components/mypage';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const hideMenu = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
        console.log('i resized');
      }
    };

    window.addEventListener('resize', hideMenu);

    return () => {
      window.removeEventListener('resize', hideMenu);
    };
  });

  const loginHandler = (data) => {
    setIsLogin(true);
    issueAccessToken(data.data.accessToken);
  };

  const issueAccessToken = (token) => {
    setAccessToken(token);
  };

  return (
    <>
      <BrowserRouter>
        <Navbar toggle={toggle} />
        <Dropdown isOpen={isOpen} toggle={toggle} />
        {isLogin ? (
          <Mypage
            accessToken={accessToken}
            issueAccessToken={issueAccessToken}
          ></Mypage>
        ) : (
          <Landing loginHandler={loginHandler} />
        )}
        <Switch>
          <Route path={['/', '/home']} exact component={Home} />
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
