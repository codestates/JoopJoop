import React from "react";

const ModalConfirmSignOut = () => {
  return (
    <div className="w-500 h-367 flex flex-col justify-center items-center text-center">
      <div className="relative left-48 bottom-1">
        <button>X</button>
      </div>
      <div className="p-10">
        <h1 className="text-3xl">회원 탈퇴하게 되시면 </h1>
      </div>
      <div className="body">
        <p>
          참가했던 모임, 채팅 등 우리의 추억이 사라져요...
          <br />
          돌아보지 말고 떠나가라 넌 나를 잊지 말고 살아가라 ha 너를
          사랑했ggiyeah 후회없ggiyeah 좋았던 기억만 가져가라 ha 그럭저럭
          살아볼만해 😭 <br />
          그럭저럭 견뎌낼만해에 넌 그럴수록 행복해야 하루하루 무더져 가네 hehehe
        </p>
      </div>
      <div className="flex">
        <button className="w-44 h-12 bg-red mx-3 mt-10 text-center rounded-3xl ">
          계속 이용할래요!
        </button>
        <button className="w-44 h-12 bg-grey-50 mx-3 mt-10 text-center rounded-3xl ">
          그만 할게요...
        </button>
      </div>
    </div>
  );
};

export default ModalConfirmSignOut;
