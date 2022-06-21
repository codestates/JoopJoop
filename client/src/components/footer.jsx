import React from "react";

function Footer() {
  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 border-t-2 py-8 md:py-4  px-11 space-y-8 border-grey-50 text-grey-80">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div>줍깅 = 줍다 + 조깅</div>
            <div>조깅을 하며 쓰레기를 주우면 그것이 바로 줍깅!</div>
            <div>건강과 환경을 동시에, 지금 바로 줍깅하세요!</div>
          </div>
          <div className="font-extralight">
            © 2022 JoopJoop. All Rights Reserved.
          </div>
        </div>
        <div className="font-semibold">
          Member
          <ul className="flex font-normal space-x-4">
            <li>김민성</li>
            <li>배현우</li>
            <li>이정윤</li>
            <li>박민혁</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Footer;
