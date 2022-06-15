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
import { useEffect } from "react";
import { format } from "date-fns";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    userId: state.userId,
    token: state.accessToken,
  };
};

const townOptions = [
  {
    value: "종로구",
    label: "종로구",
    longitude: 126.978978,
    latitude: 37.573518,
  },
  { value: "중구", label: "중구", longitude: 126.997532, latitude: 37.563843 },
  {
    value: "용산구",
    label: "용산구",
    longitude: 126.990564,
    latitude: 37.532461,
  },
  {
    value: "성동구",
    label: "성동구",
    longitude: 127.036932,
    latitude: 37.563441,
  },
  {
    value: "광진구",
    label: "광진구",
    longitude: 127.08236,
    latitude: 37.538569,
  },
  {
    value: "동대문구",
    label: "동대문구",
    longitude: 127.039733,
    latitude: 37.574414,
  },
  {
    value: "중랑구",
    label: "중량구",
    longitude: 127.092825,
    latitude: 37.60655,
  },
  {
    value: "성북구",
    label: "성북구",
    longitude: 127.016689,
    latitude: 37.589349,
  },
  {
    value: "강북구",
    label: "강북구",
    longitude: 127.0255267,
    latitude: 37.63974,
  },
  {
    value: "도봉구",
    label: "도봉구",
    longitude: 127.0471912,
    latitude: 37.668727,
  },
  {
    value: "노원구",
    label: "노원구",
    longitude: 127.056384,
    latitude: 37.654397,
  },
  {
    value: "은평구",
    label: "은평구",
    longitude: 126.928955,
    latitude: 37.602799,
  },
  {
    value: "서대문구",
    label: "서대문구",
    longitude: 126.936789,
    latitude: 37.579161,
  },
  {
    value: "마포구",
    label: "마포구",
    longitude: 126.901915,
    latitude: 37.566217,
  },
  {
    value: "양천구",
    label: "양천구",
    longitude: 126.866371,
    latitude: 37.517168,
  },
  {
    value: "강서구",
    label: "강서구",
    longitude: 126.849539,
    latitude: 37.551007,
  },
  {
    value: "구로구",
    label: "구로구",
    longitude: 126.887533,
    latitude: 37.495458,
  },
  {
    value: "금천구",
    label: "금천구",
    longitude: 126.89548,
    latitude: 37.45683,
  },
  {
    value: "영등포구",
    label: "영등포구",
    longitude: 126.896265,
    latitude: 37.526388,
  },
  {
    value: "동작구",
    label: "동작구",
    longitude: 126.9393,
    latitude: 37.51248,
  },
  {
    value: "관악구",
    label: "관악구",
    longitude: 126.951549,
    latitude: 37.4784,
  },
  {
    value: "서초구",
    label: "서초구",
    longitude: 127.032715,
    latitude: 37.483623,
  },
  {
    value: "강남구",
    label: "강남구",
    longitude: 127.047322,
    latitude: 37.517441,
  },
  {
    value: "송파구",
    label: "송파구",
    longitude: 127.105912,
    latitude: 37.514556,
  },
  {
    value: "강동구",
    label: "강동구",
    longitude: 127.123787,
    latitude: 37.530306,
  },
];
const hourOptions = [
  { value: "1", label: "1시" },
  { value: "2", label: "2시" },
  { value: "3", label: "3시" },
  { value: "4", label: "4시" },
  { value: "5", label: "5시" },
  { value: "6", label: "6시" },
  { value: "7", label: "7시" },
  { value: "8", label: "8시" },
  { value: "9", label: "9시" },
  { value: "10", label: "10시" },
  { value: "11", label: "11시" },
  { value: "12", label: "12시" },
];
const minuteOptions = [
  { value: "00", label: "00분" },
  { value: "10", label: "10분" },
  { value: "20", label: "20분" },
  { value: "30", label: "30분" },
  { value: "40", label: "40분" },
  { value: "50", label: "50분" },
];
const ampmOptions = [
  { value: "AM", label: "AM" },
  { value: "PM", label: "PM" },
];

const ModalCreateGathering = ({ modalOpen, closeModal, userId }) => {
  const [title, setTitle] = useState("");
  const [town, setTown] = useState("");
  const [townValue, setTownValue] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState(new Date());
  const [convertedDate, setConvertedDate] = useState("");
  const [hour, setHour] = useState({ value: "1" });
  const [minute, setMinute] = useState({ value: "00" });
  const [amPm, setAmPm] = useState({ value: "AM" });
  const [time, setTime] = useState("");
  const [longitude, setLongitude] = useState(126.570667);
  const [latitude, setLatitude] = useState(33.450701);

  useEffect(() => {
    setTime(`${hour.value}:${minute.value} ${amPm.value}`);
  }, [hour, minute, amPm]);

  useEffect(() => {
    setTownValue(town.value);
    setLongitude(town.longitude);
    setLatitude(town.latitude);
  }, [town]);

  useEffect(() => {
    setConvertedDate(format(date, "yyyy-M-dd").toString());
  }, [date]);

  const gatherInfo = {
    title,
    town: townValue,
    place,
    date: convertedDate,
    time,
    longitude,
    latitude,
    author: userId,
  };

  const createGathering = data => {
    axios
      .post(`${process.env.REACT_APP_LOCALSERVER_URL}/gatherings`, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then(res => closeModal())
      .catch(error => console.log("모임 생성 실패"));
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
          <CreateMapContainer
            longitude={longitude}
            latitude={latitude}
            setLongitude={setLongitude}
            setLatitude={setLatitude}
          />
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
              onChange={setTown}
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
              onChange={setDate}
              placeholderText="날짜를 선택하세요"
            />
            <div className="flex flex-row gap-4">
              <Select
                className="w-[100px] h-[46px] rounded-3xl text-center"
                options={hourOptions}
                placeholder="1시"
                value={hour}
                onChange={setHour}
              ></Select>
              <Select
                className="w-[100px] h-[46px] rounded-3xl text-center"
                options={minuteOptions}
                placeholder="00분"
                value={minute}
                onChange={setMinute}
              ></Select>
              <Select
                className="w-[100px] h-[46px] rounded-3xl text-center"
                options={ampmOptions}
                placeholder="AM"
                value={amPm}
                onChange={setAmPm}
              ></Select>
            </div>
            <Button
              className="btn btn-green w-[189px] h-[46px]"
              children={"모임 만들기"}
              onClick={() => {
                createGathering(gatherInfo);
              }}
            />
          </div>
        </div>
      </div>
    </div>,

    document.getElementById("modal"),
  );
};

export default connect(mapStateToProps)(ModalCreateGathering);
