import React from "react";
import PropTypes from "prop-types";

import { CustomButton, CircularProgressbar } from "components";

import "./style.scss";

class ProfileStatusBar extends React.Component {
  render() {
    return (
      <div className="profile-status-bar">
        <div className="section-left">
          <span>We want to show you the most relevan information for you</span>
          <CustomButton text="Complete your profile" type="primary" size="lg" />
        </div>
        <div className="section-right">
          <CircularProgressbar percent={this.props.percent} color="#fe5621" />
        </div>
      </div>
    );
  }
}

ProfileStatusBar.propTypes = {
  percent: PropTypes.number,
};

ProfileStatusBar.defaultProps = {
  percent: 0,
};

export default ProfileStatusBar;
