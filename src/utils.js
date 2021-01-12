import numeral from "numeral";
import React from "react";
import { Typography } from "@material-ui/core";
import { Circle, Popup } from "react-leaflet";
import "./MapView.css";

export const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 300,
  },
  recovered: {
    hex: "#008900",
    multiplier: 400,
  },
  deaths: {
    hex: "#c40000",
    multiplier: 600,
  },
};

export function sort(countries) {
  const arr = [...countries];

  arr.sort((a, b) => {
    return b.cases - a.cases;
  });

  return arr;
}

export function showCirclesOnMap(countries, casesType) {
  return countries.map((country, index) => (
    <Circle
      key={index}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
      pathOptions={{
        fillColor: casesTypeColors[casesType].hex,
        color: casesTypeColors[casesType].hex,
        fillOpacity: 0.5,
      }}
    >
      <Popup>
        <Typography component="h5" variant="h5">
          {country.country}
        </Typography>
        <Typography>Cases : {country.cases} </Typography>
        <Typography>Deaths : {country.deaths} </Typography>
        <Typography>Recovered : {country.recovered}</Typography>
      </Popup>
    </Circle>
  ));
}

export function pretty(newCases) {
  return newCases ? `+${numeral(newCases).format("0a")}` : 0;
}
