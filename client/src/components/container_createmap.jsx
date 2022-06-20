/*global kakao*/
import React, { useEffect } from "react";

const CreateMapContainer = (props) => {
  let latitude = props.latitude;
  let longitude = props.longitude;

  if (props.longitude === undefined) {
    longitude = 126.570667;
  }
  if (props.latitude === undefined) {
    latitude = 33.450701;
  }

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const imageSrc =
      (process.env.REACT_APP_DEPLOYSERVER_URL ||
        process.env.REACT_APP_LOCALSERVER_URL) + "/uploads/kakaomappin.png";
    // ("http://pds27.egloos.com/pds/202206/20/91/c0249191_62af73b1c1ed1.png"); // 마커이미지의 주소입니다
    console.log(imageSrc);
    const imageSize = new kakao.maps.Size(30, 43);

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    const marker = new kakao.maps.Marker({
      position: map.getCenter(),
      image: markerImage,
    });
    marker.setMap(map);

    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      const latlng = mouseEvent.latLng;
      props.setLongitude(latlng.La);
      props.setLatitude(latlng.Ma);
      marker.setPosition(latlng);
    });
  }, [props]);

  return (
    <div>
      <div id="map" className="rounded-2xl w-[313px] h-[313px]"></div>
    </div>
  );
};

export default CreateMapContainer;
