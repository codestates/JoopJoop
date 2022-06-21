import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../img/img_mobilelanding1.gif";
import img2 from "../img/img_mobilelanding2.gif";
import img3 from "../img/img_mobilelanding3.gif";
import img4 from "../img/img_mobilelanding4.gif";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
  };
  return (
    <div className="object-cover w-full h-full">
      <Slider {...settings}>
        <div className="object-cover w-full h-[95vh]">
          <img className="object-cover w-full h-full" src={img1} alt="err" />
        </div>
        <div className="object-cover w-full h-[95vh]">
          <img className="object-cover w-full h-full" src={img2} alt="err" />
        </div>
        <div className="object-cover w-full h-[95vh]">
          <img className="object-cover w-full h-full" src={img3} alt="err" />
        </div>
        <div className="object-cover w-full h-[95vh]">
          <img className="object-cover w-full h-full" src={img4} alt="err" />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
