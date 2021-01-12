import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "./MapView.css";
import { showCirclesOnMap } from "./utils";
import PropTypes from "prop-types";

export default function MapView({ countries, position, zoom, casesType }) {
  return (
    <div className="map__container">
      <MapContainer center={position} zoom={2}>
        <Map center={position} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showCirclesOnMap(countries, casesType)}
      </MapContainer>
    </div>
  );
}

function Map({ center }) {
  const map = useMap();
  map.setView(center);
  return null;
}

MapView.propTypes = {
  countries: PropTypes.array,
  position: PropTypes.any,
  zoom: PropTypes.number,
  casesType: PropTypes.string,
};
