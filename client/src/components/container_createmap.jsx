/*global kakao*/
import React, { useEffect } from "react";

const CreateMapContainer = props => {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(props.latitude, props.longitude),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
  }, [props]);

  return (
    <div>
      <div id="map" className="rounded-2xl w-[313px] h-[313px]"></div>
    </div>
  );
};

export default CreateMapContainer;
