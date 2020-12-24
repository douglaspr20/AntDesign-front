import React from "react";
import PropTypes from "prop-types";

import "./style.scss";

const SpecialtyItem = ({ title }) => {
  return <div className="specialty-item">{title}</div>;
};

SpecialtyItem.propTypes = {
  title: PropTypes.string,
};

SpecialtyItem.defaultProps = {
  title: "",
};

export default SpecialtyItem;
