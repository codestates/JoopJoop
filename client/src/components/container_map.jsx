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

    const markerPosition = new kakao.maps.LatLng(
      props.latitude,
      props.longitude,
    );

    const marker = new kakao.maps.Marker({
      position: markerPosition,
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
