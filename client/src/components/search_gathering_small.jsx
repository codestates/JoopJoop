import React from "react";
import SearchTown from "./select_town";
import SearchDate from "./select_date";
import SearchTime from "./select_time";
import { RefreshIcon } from "@heroicons/react/solid";

const location = [
  { value: "종로구", label: "종로구" },
  { value: "중구", label: "중구" },
  { value: "용산구", label: "용산구" },
  { value: "성동구", label: "성동구" },
  { value: "광진구", label: "광진구" },
  { value: "동대문구", label: "동대문구" },
  { value: "중랑구", label: "중량구" },
  { value: "성북구", label: "성북구" },
  { value: "강북구", label: "강북구" },
  { value: "도봉구", label: "도봉구" },
  { value: "노원구", label: "노원구" },
  { value: "은평구", label: "은평구" },
  { value: "서대문구", label: "서대문구" },
  { value: "마포구", label: "마포구" },
  { value: "양천구", label: "양천구" },
  { value: "강서구", label: "강서구" },
  { value: "구로구", label: "구로구" },
  { value: "금천구", label: "금천구" },
  { value: "영등포구", label: "영등포구" },
  { value: "동작구", label: "동작구" },
  { value: "관악구", label: "관악구" },
  { value: "서초구", label: "서초구" },
  { value: "강남구", label: "강남구" },
  { value: "송파구", label: "송파구" },
  { value: "강동구", label: "강동구" },
];

const time = [
  { value: "오전", label: "오전" },
  { value: "오후", label: "오후" },
];

const Search_gathering = () => {
  return (
    <>
      <div className="border-2 w-[22rem] rounded-2xl md:hidden">
        <div className="flex flex-col md:flex-row items-center place-content-between pt-4 pb-6 md:pt-[0.37rem] gap-1">
          <div className="md:pl-10 w-80 md:w-[24rem]">
            <div className="text-center text-xl font-semibold mb-4 md:hidden">
              모임 검색
            </div>
            <div className="text-center md:text-left">장소</div>
            <SearchTown className="" options={location} />
          </div>
          <div className="w-80 md:w-[6rem]">
            <div className="text-center md:text-left">날짜</div>
            <SearchDate />
          </div>
          <div className="w-80 md:w-[7rem]">
            <div className="text-center md:text-left">시간</div>
            <SearchTime options={time} />
          </div>
          <button className="hidden md:flex items-center place-content-center w-10 h-10 md:w-14 md:h-14 bg-green-100 rounded-full md:mr-3">
            <RefreshIcon className="w-5 h-5 text-white mr-0" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Search_gathering;
