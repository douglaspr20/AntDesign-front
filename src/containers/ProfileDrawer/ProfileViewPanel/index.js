import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

import { ProfileAvatar, CustomButton } from "components";
import { CONTACT_ICONS } from "enum";

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
        personalLinks: {
          data: {
            facebook: "http://facebook.com",
            linkedin: "http://linkedin.com",
            twitter: "http://twitter.com",
            link: "https://link",
          },
          completed: true,
        },
        mainLanguage: "",
        timezone: "",
        completed: false,
        percentOfCompletion: 75,
      },
    };
  }

  onEdit = () => {
    this.props.onEdit();
  };

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
            onClick={this.onEdit}
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
          <h5 className="textfield-label">Personal links</h5>
          {user.personalLinks.completed &&
            Object.keys(user.personalLinks.data).map((contact) => (
              <div className="personal-link" key={contact}>
                <div className="personal-link-icon">
                  <i className={CONTACT_ICONS[contact]} />
                </div>
                <h3 className="textfield-value completed">
                  {user.personalLinks.data[contact]}
                </h3>
              </div>
            ))}
          {!user.personalLinks.completed && (
            <h3 className="textfield-value">Complete</h3>
          )}
          <h5 className="textfield-label">Main language</h5>
          <h3
            className={clsx("textfield-value", {
              completed: !!user.mainLanguage,
            })}
          >
            {user.mainLanguage || "Complete"}
          </h3>
          <h5 className="textfield-label">Time zone</h5>
          <h3
            className={clsx("textfield-value", {
              completed: !!user.timezone,
            })}
          >
            {user.timezone || "Complete"}
          </h3>
        </div>
      </div>
    );
  }
}

ProfileViewPanel.propTypes = {
  onEdit: PropTypes.func,
};

ProfileViewPanel.defaultProps = {
  onEdit: () => {},
};

export default ProfileViewPanel;
