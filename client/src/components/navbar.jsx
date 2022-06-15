import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    userNickname: state.loginNickname,
    profileImg: state.profileImg,
  };
};

const Navbar = ({ toggle, userNickname, profileImg }) => {
  console.log(profileImg);
  return (
    <header className="flex items-center bg-green-90 h-12">
      <nav className="flex items-center">
        <Link to="/home" className="">
          <img className="w-25 h-10" src="img/logoSmall.png" alt="err" />
        </Link>
        <ul className="flex">
          <li className="p-4 text-white text-xl font-mono">
            <Link to="/home" className="">
              <div className="">홈</div>
            </Link>
          </li>
          <li className="p-4 text-white text-xl font-mono">
            <Link to="/schedule" className="">
              <div className="">일정</div>
            </Link>
          </li>
          <li className="p-4 text-white text-xl font-mono">
            <Link to="/chat" className="">
              <div className="">채팅</div>
            </Link>
          </li>
          <li className="p-4 text-white text-xl font-mono">
            <Link to="/community" className="">
              <div className="">커뮤니티</div>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="flex absolute right-12 p-4" onClick={toggle}>
        <img
          className="w-5 h-5 mr-4 cursor-pointer"
          src={{ profileImg }}
          alt="err"
        />
        <div className="cursor-pointer" onClick={toggle}>
          {userNickname}
        </div>
      </div>
    </header>
  );
};

export default connect(mapStateToProps)(Navbar);
