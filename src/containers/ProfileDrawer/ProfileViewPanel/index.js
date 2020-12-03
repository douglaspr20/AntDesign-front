import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";

import { ProfileAvatar, CustomButton } from "components";
import { CONTACT_ICONS, TIMEZONE_LIST, LANGUAGES } from "enum";

import "./style.scss";

class ProfileViewPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
    };
  }

  componentDidMount() {
    this.getProfileCompletion();
  }

  onEdit = () => {
    this.props.onEdit();
  };

  getProfileCompletion = () => {
    let { user } = this.props;
    const fields = [
      "firstName",
      "lastName",
      "img",
      "about",
      "titleProfessions",
      "proficiencyLevel",
      "topicsOfInterest",
      "personalLinks",
      "language",
      "timezone",
    ];
    let percentOfCompletion = fields.reduce((res, item) => {
      if (item === "personalLinks") {
        return this.getEmptyPersonalLinks(user.personalLinks) ? res : res + 10;
      }
      return isEmpty(user[item]) ? res : res + 10;
    }, 0);

    this.setState({
      user: {
        ...user,
        percentOfCompletion,
        completed: percentOfCompletion === 100,
      },
    });
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
    const personalLinksCompleted = !this.getEmptyPersonalLinks(
      user.personalLinks
    );
    const timezone = (
      TIMEZONE_LIST.find((item) => item.value === user.timezone) || {}
    ).text;
    const language = (
      LANGUAGES.find((item) => item.value === user.language) || {}
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
              completed: user.topicsOfInterest && user.topicsOfInterest.length,
            })}
          >
            {user.topicsOfInterest.join(", ") || "Complete"}
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
            <h3 className="textfield-value">Complete</h3>
          )}
          <h5 className="textfield-label">Main language</h5>
          <h3
            className={clsx("textfield-value", {
              completed: !!user.language,
            })}
          >
            {language || "Complete"}
          </h3>
          <h5 className="textfield-label">Time zone</h5>
          <h3
            className={clsx("textfield-value", {
              completed: !!user.timezone,
            })}
          >
            {timezone || "Complete"}
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
