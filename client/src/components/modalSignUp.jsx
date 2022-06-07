import React from "react";

const ModalSignUp = () => {
  return (
    <div className="w-500 h-647 flex flex-col justify-center items-center">
      <div className="relative left-48">
        <button>X</button>
      </div>
      <div className="p-10">
        <img className="" src="/img/LOGO.jpg"></img>
      </div>
      <div className="">
        <input
          type="email"
          className="w-72  h-10 bg-white text-center rounded-3xl outline md:outline-2 placeholder:text-grey-70"
          placeholder="Email을 입력하세요."
        />
        <button className="w-16 h-6 bg-green-90 rounded-3xl ml-2 text-white text-xs">
          중복 확인
        </button>
      </div>
      <div className="flex flex-col justify-center text-center items-center">
        <input
          type="email"
          className="w-367 h-10   bg-white text-center rounded-3xl my-3 outline md:outline-2 placeholder:text-grey-70"
          placeholder="비밀번호를 입력하세요."
        />
        <input
          type="email"
          className="w-367 h-10  bg-white text-center rounded-3xl mb-3 outline md:outline-2 placeholder:text-grey-70"
          placeholder="비밀번호를 한번 더 입력하세요."
        />{" "}
        <div className="">
          <input
            type="email"
            className="w-72  h-10 bg-white text-center rounded-3xl outline md:outline-2 placeholder:text-grey-70"
            placeholder="닉네임을 입력하세요."
          />
          <button className="w-16 h-6 bg-green-90 rounded-3xl ml-2 text-white text-xs">
            중복 확인
          </button>
        </div>
        <div className="">
          <button className="w-36 h-12 bg-green-80 mx-3 text-center rounded-3xl  text-white">
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSignUp;
