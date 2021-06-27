import React from "react";
import PropTypes from "prop-types";

import "./style.scss";

const PodcastSeriesDetail = ({ title }) => {
  return <div className="base-component">{title}</div>;
};

PodcastSeriesDetail.propTypes = {
  title: PropTypes.string,
};

PodcastSeriesDetail.defaultProps = {
  title: "",
};

export default PodcastSeriesDetail;
