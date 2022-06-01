import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Chat from './components/pages/chat';
import Community from './components/pages/community';
import Home from './components/pages/home';
import Logout from './components/pages/logout';
import Mypage from './components/pages/mypage';
import Schedule from './components/pages/schedule';
import './app.css';
import Navbar from './components/navbar';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path={['/', '/home']} exact component={Home} />
          <Route path='/schedule' component={Schedule} />
          <Route path='/chat' component={Chat} />
          <Route path='/community' component={Community} />
          <Route path='/mypage' component={Mypage} />
          <Route path='/logout' component={Logout} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
