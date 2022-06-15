import React, { useState } from "react";
import axios from "axios";
import ReactDom from "react-dom";
import Button from "../components/button";
import { XIcon } from "@heroicons/react/solid";
import Select from "react-select";
import { ko } from "date-fns/esm/locale";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CreateMapContainer from "../components/container_createmap";

const townOptions = [
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
const hourOptions = [{ value: "종로구", label: "종로구" }];

const ModalCreateGathering = ({ modalOpen, closeModal }) => {
  const [title, setTitle] = useState("");
  const [town, setTown] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [longitude, setLongitude] = useState(126.570667);
  const [latitude, setLatitude] = useState(33.450701);
  const gatherInfo = { title, town, place, date, longitude, latitude };
  // console.log(gatherInfo);

  const createGathering = data => {
    axios
      .post(
        process.env.REACT_APP_LOCALSERVER_URL + "/gatherings/:" + "userid추가",
        { data },
        {
          withCredentials: true,
        },
      )
      .then(res => {})
      .catch(error => {});
  };

  if (!modalOpen) return null;
  return ReactDom.createPortal(
    <div className="container-modal">
      <div className="modal-large gap-4">
        <div className="relative w-full">
          <button
            className="absolute left-[93.5%] bottom-[4.5rem]"
            onClick={closeModal}
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="text-3xl mb-5 felx items-center text-center">
          모임 만들기
        </div>
        <div className="flex felx-row items-start gap-4">
          <CreateMapContainer longitude={longitude} latitude={latitude} />
          <div className="flex flex-col items-center gap-4">
            <input
              type="text"
              className=" w-[340px] h-[46px] input-ring-green rounded-3xl text-center"
              placeholder="모임 제목을 입력하세요."
              onChange={e => setTitle(e.target.value)}
            />
            <Select
              className="w-[340px] h-[46px] rounded-3xl text-center"
              options={townOptions}
              placeholder="지역를 선택해주세요"
              value={town}
              onChange={() => setTown(town)}
            ></Select>
            <input
              type="text"
              className=" w-[340px] h-[46px] input-ring-green rounded-3xl text-center"
              placeholder="장소를 입력하세요"
              onChange={e => setPlace(e.target.value)}
            />
            <DatePicker
              className="w-[340px] h-[46px] input-ring-green rounded-3xl text-center"
              locale={ko}
              dateFormat="yy/MM/dd"
              selected={date}
              onChange={() => setDate(date)}
              placeholderText="날짜를 선택하세요"
            />
            <div className="flex flex-row gap-4">
              <Select
                className="w-[160px] h-[46px] rounded-3xl text-center"
                options={hourOptions}
                placeholder="시"
                value={hour}
                onChange={() => setHour(hour)}
              ></Select>
              <Select
                className="w-[160px] h-[46px] rounded-3xl text-center"
                options={hourOptions}
                placeholder="분"
                value={minute}
                onChange={() => setMinute(minute)}
              ></Select>
            </div>
            <Button
              className="btn btn-green w-[189px] h-[46px]"
              children={"모임 만들기"}
              onClick={() => console.log(gatherInfo)}
            />
          </div>
        </div>
      </div>
    </div>,

    document.getElementById("modal"),
  );
};

export default ModalCreateGathering;
