import React from "react";
import PropTypes from "prop-types";

import "./style.scss";

const GlobalConference = ({ title }) => {
  return (
    <div className="global-conference">
      Coming soon
    </div>
  );
};

GlobalConference.propTypes = {
  title: PropTypes.string,
};

GlobalConference.defaultProps = {
  title: "",
};

export default GlobalConference;
