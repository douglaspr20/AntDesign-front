import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import isEqual from "lodash/isEqual";

import { ProfileAvatar, CustomButton } from "components";
import { CONTACT_ICONS, TIMEZONE_LIST, LANGUAGES, COUNTRIES } from "enum";
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

  getLanguage = (value) => {
    const language = (Languages.find((item) => item.value === value) || {})
      .text;

    return language;
  };

  render() {
    const { user } = this.state;
    const personalLinksCompleted = !isEmptyPersonalLinks(user.personalLinks);
    const timezone = (
      TIMEZONE_LIST.find((item) => item.value === user.timezone) || {}
    ).text;
    const location = (
      COUNTRIES.find((item) => item.value === user.location) || {}
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
          <h5 className="textfield-label">Email</h5>
          <h3 className="textfield-value completed">{user.email}</h3>
          <h5 className="textfield-label">Title</h5>
          <h3
            className={clsx("textfield-value", {
              completed: !!user.titleProfessions,
            })}
          >
            {user.titleProfessions || "-"}
          </h3>
          <h5 className="textfield-label">Company</h5>
          <h3
            className={clsx("textfield-value", { completed: !!user.company })}
          >
            {user.company || "-"}
          </h3>
          <h5 className="textfield-label">Location</h5>
          <h3
            className={clsx("textfield-value", {
              completed: !!location,
            })}
          >
            {location || "-"}
          </h3>
          <h5 className="textfield-label">City</h5>
          <h3 className={clsx("textfield-value", { completed: !!user.city })}>
            {user.city || "-"}
          </h3>
          <h5 className="textfield-label">Time zone</h5>
          <h3
            className={clsx("textfield-value", {
              completed: !!user.timezone,
            })}
          >
            {timezone || "-"}
          </h3>
          <h5 className="textfield-label">Main language</h5>
          {user.languages && user.languages.length > 0 ? (
            user.languages.map((lang, index) => (
              <h3 key={index} className="textfield-value completed">
                {this.getLanguage(lang)}
              </h3>
            ))
          ) : (
            <h3 className="textfield-value">-</h3>
          )}
          <h5 className="textfield-label">Tell us more about you</h5>
          <h3 className={clsx("textfield-value", { completed: !!user.about })}>
            {user.about || "-"}
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
                  {user.personalLinks[contact] || ""}
                </h3>
              </div>
            ))}
          {!personalLinksCompleted && <h3 className="textfield-value">-</h3>}
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
