import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import Dropdown from './dropdown';

function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          <img className='navbar-logo' src='img/LOGO.png' />
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/home' className='nav-links' onClick={closeMobileMenu}>
              홈
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/schedule'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              일정
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/chat' className='nav-links' onClick={closeMobileMenu}>
              채팅
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/community'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              커뮤니티
            </Link>
          </li>
          <li className='nav-item'>
            <div className='nav-links' onClick={closeMobileMenu}>
              <i class='fa-solid fa-bell'></i>
            </div>
          </li>
          <li
            className='nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <div className='nav-links' onClick={closeMobileMenu}>
              유저아이디
              <i className='fas fa-caret-down' />
            </div>
            {dropdown && <Dropdown />}
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
