import React from "react";

import { ProfileAvatar, CustomButton } from "components";

import "./style.scss";

class ProfileViewPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        name: "Edgar Davis",
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
      <div className="profile-view-panel">
        <div className="profile-view-panel-header">
          <ProfileAvatar
            className="user-info-avatar"
            user={user}
            percent={user.percentOfCompletion}
          />
          <h1 className="user-info-name">{user.name}</h1>
          <CustomButton
            className="profile-complete-btn"
            text={user.completed ? "Edit Profile" : "Complete profile"}
            type="primary"
            size="lg"
          />
        </div>
      </div>
    );
  }
}

export default ProfileViewPanel;
