import { Card, Typography } from "@material-ui/core";
import React from "react";
import numeral from "numeral";
import { pretty } from "./utils";
import PropTypes from "prop-types";
import "./Info.css";

export default function Info({
  title,
  active,
  todayCases,
  totalCases,
  ...props
}) {
  return (
    <Card
      variant="outlined"
      className={`infoCard infoCard__${title} 
      ${active && `infoCard--selected`}
      `}
      onClick={props.onClick}
    >
      <Typography className="infoCard__todayCases">
        New {title}: {pretty(todayCases)}
      </Typography>
      <Typography className="infoCard__totalCases">
        Total {title}: {numeral(totalCases).format("0a")}
      </Typography>
    </Card>
  );
}

Info.propTypes = {
  title: PropTypes.string,
  todayCases: PropTypes.number,
  totalCases: PropTypes.number,
  onClick: PropTypes.func,
  active: PropTypes.bool,
};
