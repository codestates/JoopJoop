import React from "react";
import Button from "../components/button";
import SearchGathering from "../components/search_gathering";
import Card from "../components/card_gathering";
import axios from "axios";

axios
  .get("http://localhost:80/gatherings/", {
    withCredentials: true,
  })
  .then(data => console.log(data));

const Home = () => {
  return (
    <div className="flex flex-col items-center">
      <div>
        <div className="h-12">spacer</div>
        <SearchGathering></SearchGathering>
        <Button className={"btn btn-green"} children={"모임 만들기"}></Button>
      </div>
      <div>
        <Card></Card>
      </div>
    </div>
  );
};

export default Home;
