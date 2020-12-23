import React from "react";
import PropTypes from "prop-types";

import { WantCard } from "components";

import "./style.scss";

const MentorPanel = () => {
  return (
    <div className="mentor-panel">
      <div className="mentor-panel-container">
        <WantCard type="mentor" />
      </div>
    </div>
  );
};

MentorPanel.propTypes = {
  title: PropTypes.string,
};

MentorPanel.defaultProps = {
  title: "",
};

export default MentorPanel;
