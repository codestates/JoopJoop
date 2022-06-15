/*global kakao*/
import React, { useEffect } from "react";

const MapContainer = props => {
  const x = props.latitude;
  const y = props.longitude;
  console.log(x, y);

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(x, y),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
  }, [x, y]);

  return (
    <div>
      <div id="map" style={{ width: "313px", height: "313px" }}></div>
    </div>
  );
};

export default MapContainer;
