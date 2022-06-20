/*global kakao*/
import React, { useEffect } from "react";

const MapContainer = (props) => {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(props.latitude, props.longitude),
      level: 3,
      draggable: false,
    };
    const map = new kakao.maps.Map(container, options);

    const imageSrc =
      (process.env.REACT_APP_DEPLOYSERVER_URL ||
        process.env.REACT_APP_LOCALSERVER_URL) + "/uploads/kakaomappin.png";
    // "http://pds27.egloos.com/pds/202206/20/91/c0249191_62af73b1c1ed1.png"; // 마커이미지의 주소입니다
    const imageSize = new kakao.maps.Size(30, 43);

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    const markerPosition = new kakao.maps.LatLng(
      props.latitude,
      props.longitude,
    );

    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });

    marker.setMap(map);

    let zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
  }, []);

  return (
    <div>
      <div id="map" className="rounded-2xl w-[313px] h-[313px]"></div>
    </div>
  );
};

export default MapContainer;
