import React from "react";
import PropTypes from "prop-types";

import "./style.scss";

const PodcastSeries = ({ title }) => {
  return <div className="base-component">{title}</div>;
};

PodcastSeries.propTypes = {
  title: PropTypes.string,
};

PodcastSeries.defaultProps = {
  title: "",
};

export default PodcastSeries;
