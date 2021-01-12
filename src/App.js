import { Card, CardContent, MenuItem, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./App.css";
import Info from "./Info";
import Table from "./Table";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
import MapView from "./MapView";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryData, setCountryData] = useState({});
  const [mapZoom, setMapZoom] = useState(3);
  const [mapPosition, setMapPosition] = useState({ lat: 34.6, lng: 40.8 });
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    const getCountries = async () => {
      const response = await fetch("https://disease.sh/v3/covid-19/countries");
      const data = await response.json();
      setCountries(data);
    };
    getCountries();
  }, []);

  useEffect(() => {
    const getAllData = async () => {
      const response = await fetch("https://disease.sh/v3/covid-19/all");
      const json = await response.json();
      setCountryData(json);
    };
    getAllData();
  }, []);

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;

    const url =
      selectedCountry === "Worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${selectedCountry}`;

    const getCountryData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setCountryData(data);
      setCountry(selectedCountry);
      const mapObj =
        selectedCountry === "Worldwide"
          ? [34.46, 40.8]
          : [data.countryInfo.lat, data.countryInfo.long];
      setMapPosition(mapObj);
      setMapZoom(4);
    };
    getCountryData();
  };

  return (
    <div className="app">
      <div className="app__header">
        <h3>Covid 19 Tracker</h3>
        <Select
          variant="outlined"
          value={country}
          onChange={handleCountryChange}
          className="select__country"
        >
          <MenuItem value="Worldwide">Worldwide</MenuItem>
          {countries.map((countryInfo, index) => (
            <MenuItem key={index} value={countryInfo.country}>
              {countryInfo.country}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className="app__container">
        <div className="app__left">
          <div className="app__infoCard">
            <Info
              active={casesType === "cases"}
              onClick={() => setCasesType("cases")}
              title="Cases"
              todayCases={countryData.todayCases}
              totalCases={countryData.cases}
              className="info-title cases"
            />
            <Info
              active={casesType === "recovered"}
              onClick={() => setCasesType("recovered")}
              title="Recovered"
              todayCases={countryData.todayRecovered}
              totalCases={countryData.recovered}
            />
            <Info
              active={casesType === "deaths"}
              onClick={() => setCasesType("deaths")}
              title="Deaths"
              todayCases={countryData.todayDeaths}
              totalCases={countryData.deaths}
            />
          </div>
          <div className="app__map">
            <MapView
              countries={countries}
              position={mapPosition}
              zoom={mapZoom}
              casesType={casesType}
            />
          </div>
        </div>

        <div className="app__right">
          <Card variant="outlined">
            <Table countries={countries} />
          </Card>

          <Card variant="outlined" className="app__chart">
            <CardContent>
              <LineGraph casesType={casesType} />
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="app__footer">
        <p>Created by Debarshi</p>
      </div>
    </div>
  );
}
