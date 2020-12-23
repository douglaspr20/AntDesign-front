import React from "react";
import PropTypes from "prop-types";

import { WantCard } from "components";

import "./style.scss";

const MenteePanel = ({ openSetting }) => {
  return (
    <div className="mentee-panel">
      <div className="mentee-panel-container">
        <WantCard type="mentee" onClick={openSetting} />
      </div>
    </div>
  );
};

MenteePanel.propTypes = {
  openSetting: PropTypes.func,
};

MenteePanel.defaultProps = {
  openSetting: "",
};

export default MenteePanel;
