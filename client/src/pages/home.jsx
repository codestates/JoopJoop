import React, { useState, useEffect } from "react";
import Button from "../components/button";
import SearchGathering from "../components/search_gathering";
import Card from "../components/card_gathering";

import Navbar from "../components/navbar";
import Dropdown from "../components/dropdown";
import axios from "axios";

axios
  .get("http://localhost:80/gatherings/", {
    withCredentials: true,
  })
  .then((data) => console.log(data));
=======

import mockGatherings from "../mockData/mock_gather.json";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const hideMenu = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
        console.log("i resized");
      }
    };
    window.addEventListener("resize", hideMenu);
    return () => {
      window.removeEventListener("resize", hideMenu);
    };
  });

  return (

    <>
      <Navbar toggle={toggle} />
      <Dropdown isOpen={isOpen} toggle={toggle} />
      <div className="flex flex-col items-center">
        <div>
          <div className="h-12">spacer</div>
          <SearchGathering></SearchGathering>
          <Button className={"btn btn-green"} children={"모임 만들기"}></Button>
        </div>
        <div>
          <Card></Card>
        </div>

    <div className="flex flex-col items-center">
      <div>
        <div className="h-12">spacer</div>
        <SearchGathering></SearchGathering>
        <Button className={"btn btn-green"} children={"모임 만들기"}></Button>
      </div>
      <div>
        <Card props={mockGatherings[0]}></Card>
      </div>
    </>
  );
};

export default Home;
