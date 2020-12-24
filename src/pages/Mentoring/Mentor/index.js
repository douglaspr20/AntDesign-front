import React from "react";
import PropTypes from "prop-types";

import { WantCard } from "components";

import "./style.scss";

const MentorPanel = ({ setting, isMentor, openSetting, onEdit }) => {
  return (
    <div className="mentor-panel">
      <div className="mentor-panel-container">
        {isMentor ? (
          <div className="mentor-panel-description">
            <h5 className="mentor-panel-description-label">
              Why do you want to be a mentor?
            </h5>
            <p className="mentor-panel-description-reason">
              {setting.reason || ""}
            </p>
            <div className="mentor-panel-description-specialties">
              {(setting.specialties || []).map((spec, index) => (
                <div key={`specialty-${index}`} className="specialty-item">
                  {spec}
                </div>
              ))}
            </div>
            <span className="edit-information" onClick={onEdit}>
              Edit mentor information
            </span>
          </div>
        ) : (
          <WantCard type="mentor" onClick={openSetting} />
        )}
      </div>
    </div>
  );
};

MentorPanel.propTypes = {
  setting: PropTypes.object,
  isMentor: PropTypes.bool,
  openSetting: PropTypes.func,
  onEdit: PropTypes.func,
};

MentorPanel.defaultProps = {
  setting: {},
  isMentor: false,
  openSetting: () => {},
  onEdit: () => {},
};

export default MentorPanel;
