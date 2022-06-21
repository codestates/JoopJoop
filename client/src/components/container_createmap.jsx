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

    const marker = new kakao.maps.Marker({
      position: map.getCenter(),
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
