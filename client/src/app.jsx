import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Chat from './pages/chat';
import Community from './pages/community';
import Home from './pages/home';
import Profile from './pages/profile';
import Schedule from './pages/schedule';
import './app.css';

function App() {
  return (
    <BrowserRouter>
      <nav id='navbar'>
        <ul className='navbar__menu'>
          <li>
            <Link to='/'>홈</Link>
          </li>
          <li>
            <Link to='/schedule'>일정</Link>
          </li>
          <li>
            <Link to='/chat'>채팅</Link>
          </li>
          <li>
            <Link to='/community'>커뮤니티</Link>
          </li>
        </ul>
        <div className='navbar__mypage'>
          <i class='fa-solid fa-bell'></i>
          <Link to='/profile'>Profile</Link>
        </div>
      </nav>
      <Switch>
        <Route path={['/', '/home']} exact>
          <Home />
        </Route>
        <Route path='/schedule'>
          <Schedule />
        </Route>
        <Route path='/chat'>
          <Chat />
        </Route>
        <Route path='/community'>
          <Community />
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
