import React from "react";
import KaKaoLogin from "react-kakao-login";

const Kakao = ({ oAuthLoginHandler }) => {
  return (
    <>
      <KaKaoLogin
        token={process.env.REACT_APP_KAKAO_ID}
        buttonText="kakao"
        onSuccess={oAuthLoginHandler}
        onFail={console.error}
        onLogout={console.info}
      >
        <div>카카오 계정으로 로그인</div>
      </KaKaoLogin>
    </>
  );
};
export default Kakao;
