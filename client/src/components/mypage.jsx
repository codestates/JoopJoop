import React, { useState } from "react";
import axios from "axios";

const Mypage = () => {
  const accessTokenRequest = () => {
    axios
      .get("https://localhost:4000/accesstokenrequest", {
        headers: {
          Authorization: `Bearer ${this.props.accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then(res => {
        if (res.data.message !== "ok") {
          const message =
            "access token이 만료되어 불러올 수 없습니다. refresh token을 사용해주시기 바랍니다.";
          return this.setState({ email: message, createdAt: message });
        }
        const { createdAt, userId, email } = res.data.data.userInfo;
        this.setState({ userId, createdAt, email });
      });
  };

  const refreshTokenRequest = () => {
    axios
      .get("https://localhost:4000/refreshtokenrequest", {
        withCredentials: true,
      })
      .then(res => {
        if (res.data.message !== "ok") {
          const message =
            "refresh token이 만료되어 불러올 수 없습니다. 다시 로그인 해주시기 바랍니다.";
          return this.setState({ email: message, createdAt: message });
        }
        const { createdAt, userId, email } = res.data.data.userInfo;
        this.setState({ userId, createdAt, email });
        this.props.issueAccessToken(res.data.data.accessToken);
      });
  };

  const { userId, email, createdAt } = this.state;
  return (
    <div className="mypageContainer">
      <div className="title">Mypage</div>
      <hr />
      <br />
      <br />
      <div>
        안녕하세요. <span className="name">{userId ? userId : "Guest"}</span>님!
        jwt 로그인이 완료되었습니다.
      </div>
      <br />
      <br />
      <div className="item">
        <span className="item">나의 이메일: </span> {email}
      </div>
      <div className="item">
        <span className="item">나의 아이디 생성일: </span> {createdAt}
      </div>
      <br />
      <br />
      <div className="btnContainer">
        <button className="tokenBtn red" onClick={this.accessTokenRequest}>
          access token request
        </button>
        <button className="tokenBtn navy" onClick={this.refreshTokenRequest}>
          refresh token request
        </button>
      </div>
    </div>
  );
};
export default Mypage;
