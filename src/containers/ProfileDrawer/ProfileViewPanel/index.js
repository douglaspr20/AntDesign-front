import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import isEqual from "lodash/isEqual";

import { ProfileAvatar, CustomButton } from "components";
import { CONTACT_ICONS, TIMEZONE_LIST, LANGUAGES } from "enum";
import { isEmptyPersonalLinks } from "utils/profile";

import "./style.scss";

const Languages = LANGUAGES.ParsedLanguageData;

class ProfileViewPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
    };
  }

  componentDidUpdate(preProps) {
    if (!isEqual(preProps.user, this.props.user)) {
      this.setState({ user: this.props.user });
    }
  }

  onEdit = () => {
    this.props.onEdit();
  };

  getEmptyPersonalLinks = (personalLinks) => {
    let empty = true;
    if (personalLinks) {
      Object.keys(personalLinks).forEach((contact) => {
        if (personalLinks[contact]) {
          empty = false;
        }
      });
    }

    return empty;
  };

  render() {
    const { user } = this.state;
    const personalLinksCompleted = !isEmptyPersonalLinks(user.personalLinks);
    const timezone = (
      TIMEZONE_LIST.find((item) => item.value === user.timezone) || {}
    ).text;
    const language = (
      Languages.find((item) => item.value === user.language) || {}
    ).text;

    return (
      <div className="profile-view-panel">
        <div className="profile-view-panel-header">
          <ProfileAvatar
            className="user-info-avatar"
            user={user}
            percent={user.percentOfCompletion}
          />
          <h1 className="user-info-name">{`${user.firstName} ${user.lastName}`}</h1>
          <CustomButton
            className="profile-complete-btn"
            text={user.completed ? "Edit Profile" : "Complete profile"}
            type="primary"
            size="lg"
            onClick={this.onEdit}
          />
        </div>
        <div className="profile-view-panel-content">
          <h5 className="textfield-label">Company</h5>
          <h3
            className={clsx("textfield-value", { completed: !!user.company })}
          >
            {user.company || "-"}
          </h3>
          <h5 className="textfield-label">About you</h5>
          <h3 className={clsx("textfield-value", { completed: !!user.about })}>
            {user.about || "-"}
          </h3>
          <h5 className="textfield-label">Title / Profession</h5>
          <h3
            className={clsx("textfield-value", {
              completed: !!user.titleProfessions,
            })}
          >
            {user.titleProfessions || "-"}
          </h3>
          <h5 className="textfield-label">Proficiency level</h5>
          <h3
            className={clsx("textfield-value", {
              completed: !!user.proficiencyLevel,
            })}
          >
            {user.proficiencyLevel || "-"}
          </h3>
          <h5 className="textfield-label">Topics of interest</h5>
          <h3
            className={clsx("textfield-value", {
              completed: user.topicsOfInterest && user.topicsOfInterest.length,
            })}
          >
            {user.topicsOfInterest.join(", ") || "-"}
          </h3>
          <h5 className="textfield-label">Personal links</h5>
          {personalLinksCompleted &&
            Object.keys(user.personalLinks).map((contact) => (
              <div className="personal-link" key={contact}>
                <div className="personal-link-icon">
                  <i className={CONTACT_ICONS[contact]} />
                </div>
                <h3 className="textfield-value completed">
                  {user.personalLinks[contact]
                    ? `http://${user.personalLinks[contact]}`
                    : ""}
                </h3>
              </div>
            ))}
          {!personalLinksCompleted && (
            <h3 className="textfield-value">-</h3>
          )}
          <h5 className="textfield-label">Main language</h5>
          <h3
            className={clsx("textfield-value", {
              completed: !!user.language,
            })}
          >
            {language || "-"}
          </h3>
          <h5 className="textfield-label">Time zone</h5>
          <h3
            className={clsx("textfield-value", {
              completed: !!user.timezone,
            })}
          >
            {timezone || "-"}
          </h3>
        </div>
      </div>
    );
  }
}

ProfileViewPanel.propTypes = {
  user: PropTypes.object,
  onEdit: PropTypes.func,
};

ProfileViewPanel.defaultProps = {
  user: {},
  onEdit: () => {},
};

export default ProfileViewPanel;
