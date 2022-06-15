/*global kakao*/
import React, { useEffect } from "react";

const MapContainer = props => {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(props.latitude, props.longitude),
      level: 3,
      draggable: false,
    };
    const map = new kakao.maps.Map(container, options);

    var markerPosition = new kakao.maps.LatLng(props.latitude, props.longitude);

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
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
