import React from "react";
import clsx from "clsx";

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
        <div className="profile-view-panel-content">
          <h5 className="textfield-label">About you</h5>
          <h3 className={clsx("textfield-value", { completed: !!user.about })}>
            {user.about || "Complete"}
          </h3>
          <h5 className="textfield-label">Title / Profession</h5>
          <h3
            className={clsx("textfield-value", {
              completed: !!user.titleProfessions,
            })}
          >
            {user.titleProfessions || "Complete"}
          </h3>
          <h5 className="textfield-label">Proficiency level</h5>
          <h3
            className={clsx("textfield-value", {
              completed: !!user.proficiencyLevel,
            })}
          >
            {user.proficiencyLevel || "Complete"}
          </h3>
          <h5 className="textfield-label">Topics of interest</h5>
          <h3
            className={clsx("textfield-value", {
              completed: !!user.topicsOfInterest,
            })}
          >
            {user.topicsOfInterest || "Complete"}
          </h3>
        </div>
      </div>
    );
  }
}

export default ProfileViewPanel;
