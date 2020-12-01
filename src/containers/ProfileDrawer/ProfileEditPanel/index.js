import React from "react";
import PropTypes from "prop-types";

import "./style.scss";

class ProfileEditPanel extends React.Component {
  render() {
    return (
      <div className="profile-edit-panel">
        Profile Edit Panel
      </div>
    );
  }
}

ProfileEditPanel.propTypes = {
  title: PropTypes.string,
};

ProfileEditPanel.defaultProps = {
  title: "",
};

export default ProfileEditPanel;
