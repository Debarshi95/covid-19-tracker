import React from "react";
import "./Table.css";
import { sort } from "./utils";
import numeral from "numeral";
import PropType from "prop-types";

export default function Table({ countries }) {
  const sortedCountries = sort(countries);
  return (
    <div className="table-wrapper">
      <h4>Cases by countries</h4>
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Cases</th>
            <th>Recovered</th>
            <th>Deaths</th>
          </tr>
        </thead>
        <tbody>
          {sortedCountries.map((country, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>{country.country}</td>
                <td>{numeral(country.cases).format("0a")}</td>
                <td>{numeral(country.recovered).format("0a")}</td>
                <td>{numeral(country.deaths).format("0a")}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
Table.propTypes = {
  countries: PropType.array,
};
