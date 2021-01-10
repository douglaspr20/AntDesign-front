import React from "react";
import PropTypes from "prop-types";

import { CustomButton, CircularProgressbar } from "components";
import Emitter from "services/emitter";
import { EVENT_TYPES } from "enum";

import "./style.scss";

const ProfileStatusBar = ({ percent }) => {
  const openProfileEditWindow = () => {
    Emitter.emit(EVENT_TYPES.EVENT_VIEW_PROFILE, true);
  };

  return (
    <div className="profile-status-bar">
      <div className="section-left">
        <span>We want to show you the most relevan information for you</span>
        <CustomButton
          text="Complete your profile"
          type="primary"
          size="lg"
          onClick={openProfileEditWindow}
        />
      </div>
      <div className="section-right">
        <CircularProgressbar percent={percent} color="#fe5621" />
      </div>
    </div>
  );
};

ProfileStatusBar.propTypes = {
  percent: PropTypes.number,
};

ProfileStatusBar.defaultProps = {
  percent: 0,
};

export default ProfileStatusBar;
