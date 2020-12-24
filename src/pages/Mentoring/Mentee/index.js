import React from "react";
import PropTypes from "prop-types";

import { SpecialtyItem, WantCard } from "components";

import "./style.scss";

const MenteePanel = ({ setting, isMentee, openSetting, onEdit }) => {
  return (
    <div className="mentee-panel">
      <div className="mentee-panel-container">
        {isMentee ? (
          <div className="mentee-panel-description">
            <h5 className="mentee-panel-description-label">
              Why do you want to be a mentee?
            </h5>
            <p className="mentee-panel-description-reason">
              {setting.reason || ""}
            </p>
            <div className="mentee-panel-description-specialties">
              {(setting.specialties || []).map((spec, index) => (
                <SpecialtyItem key={`specialty-${index}`} title={spec} />
              ))}
            </div>
            <span className="edit-information" onClick={onEdit}>
              Edit mentee information
            </span>
          </div>
        ) : (
          <WantCard type="mentee" onClick={openSetting} />
        )}
      </div>
    </div>
  );
};

MenteePanel.propTypes = {
  setting: PropTypes.object,
  isMentee: PropTypes.bool,
  openSetting: PropTypes.func,
  onEdit: PropTypes.func,
};

MenteePanel.defaultProps = {
  setting: {},
  isMentee: false,
  openSetting: "",
  onEdit: () => {},
};

export default MenteePanel;
