import React from "react";
import PropTypes from "prop-types";

import { WantCard } from "components";

import "./style.scss";

const MenteePanel = () => {
  return (
    <div className="mentee-panel">
      <div className="mentee-panel-container">
        <WantCard type="mentee" />
      </div>
    </div>
  );
};

MenteePanel.propTypes = {
  title: PropTypes.string,
};

MenteePanel.defaultProps = {
  title: "",
};

export default MenteePanel;
