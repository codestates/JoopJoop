import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../img/img_landing1.png";
import img2 from "../img/img_landing2.png";
import img3 from "../img/img_landing3.png";
import img4 from "../img/img_landing4.png";
import img5 from "../img/img_landing5.png";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="object-cover w-full h-full">
      <Slider {...settings}>
        <div className="object-cover w-full h-[93vh]">
          <img className="object-cover w-full h-full" src={img5} alt="err" />
        </div>
        <div>
          <img src={img5} alt="err" />
        </div>
        <div>
          <img src={img5} alt="err" />
        </div>
        <div>
          <img src={img5} alt="err" />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
