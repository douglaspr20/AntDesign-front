import React from "react";
import PropTypes from "prop-types";

import { CustomButton } from "components";

import "./style.scss";

class ProfileEditPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: "Edgar",
        lastName: "Davis",
        abbrName: "ED",
        img: null,
        about: `Developing Talent & Leadership behaviors. Positive Design Thinking & Strategy through Positive Leadership Strategy and POSITIVE & AGILE coaching | 2 hack habits, goal achievement, and behavior transformation in organizations, sports clubs, PYMES, and corporations.`,
        titleProfessions: "HR Management & Coaching",
        proficiencyLevel: "",
        topicsOfInterest: "",
        completed: false,
        percentOfCompletion: 75,
      },
    };
  }

  render() {
    const { user } = this.state;

    return (
      <div className="profile-edit-panel">
        <div className="profile-edit-panel-container">
          <div className="profile-edit-panel-header">
            <div className="profile-user-img">
              <div className="profile-user-img-container">
                {user.img ? (
                  <img src={user.img} alt="user-avatar" />
                ) : (
                  <h1 className="profile-user-img-name">{user.abbrName}</h1>
                )}
                <div className="profile-user-img-camera">
                  <i className="fal fa-camera" />
                </div>
              </div>
            </div>
          </div>
          <div className="profile-edit-panel-content">
            <h5 className="textfield-label">First name</h5>
            <h5 className="textfield-label">Last name</h5>
            <h5 className="textfield-label">Tell us something about you</h5>
            <h5 className="textfield-label">
              What is your title or profession?
            </h5>
            <h5 className="textfield-label">Tell us topics of your interest</h5>
            <h5 className="textfield-label">What is your proficiency level?</h5>
            <h5 className="textfield-label">Peronal links</h5>
            <h5 className="textfield-label">Main language</h5>
            <h5 className="textfield-label">Time zone</h5>
          </div>
        </div>
        <div className="profile-edit-panel-footer">
          <CustomButton text="Cancel" type="third outlined" size="lg" />
          <CustomButton text="Save" type="secondary" size="lg" />
        </div>
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
