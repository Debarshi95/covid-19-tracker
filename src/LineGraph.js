import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import { casesTypeColors } from "./utils";
import PropTypes from "prop-types";
import "./LineGraph.css";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
        },
        type: "time",
        time: {
          parser: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};
export default function LineGraph({ casesType }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getHistoricalData = async () => {
      const response = await fetch(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=60"
      );
      const jsonData = await response.json();
      const chartData = createChartData(jsonData);
      console.log(chartData);
      setData(chartData);
    };
    getHistoricalData();
  }, [casesType]);

  const createChartData = (mdata) => {
    const chartData = [];
    let lastDataPoint;
    for (let date in mdata[casesType]) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: mdata[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = mdata[casesType][date];
    }
    return chartData;
  };

  return (
    <div className="chart__container">
      <h4>Worldwide {casesType}</h4>
      <Line
        options={options}
        data={{
          datasets: [
            {
              fill: false,
              data: data,
              borderColor: casesTypeColors[casesType].hex,
            },
          ],
        }}
      />
    </div>
  );
}

LineGraph.propTypes = {
  casesType: PropTypes.string,
};
