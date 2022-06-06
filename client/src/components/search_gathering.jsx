import React from "react";
import SearchLocation from "./select_location";
import SearchDate from "./select_date";

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
  { category: "Group 1", value: "오전", label: "오전" },
  { category: "Group 1", value: "오후", label: "오후" },
  { category: "Group 3", value: "저녁", label: "저녁" },
];

const Search_gathering = props => {
  return (
    <>
      <div className="border-2 w-[45rem] border-green-100 rounded-full">
        <div className="flex place-content-between gap-1">
          <div className="pl-10 w-[24rem] justify-center">
            <div className="">장소</div>
            <SearchLocation options={location} />
          </div>
          <div className="w-[6rem]">
            <div>날짜</div>
            <SearchDate />
          </div>
          <div className="w-[7rem]">
            <div>시간</div>
            <SearchLocation options={time} />
          </div>
          <div className="pr-10 w-[3rem]">
            <i>Search icon</i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search_gathering;
