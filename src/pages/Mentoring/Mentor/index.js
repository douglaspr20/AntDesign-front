import React from "react";
import PropTypes from "prop-types";

import { WantCard } from "components";

import "./style.scss";

const MentorPanel = ({ openSetting }) => {
  return (
    <div className="mentor-panel">
      <div className="mentor-panel-container">
        <WantCard type="mentor" onClick={openSetting} />
      </div>
    </div>
  );
};

MentorPanel.propTypes = {
  openSetting: PropTypes.func,
};

MentorPanel.defaultProps = {
  openSetting: () => {},
};

export default MentorPanel;
