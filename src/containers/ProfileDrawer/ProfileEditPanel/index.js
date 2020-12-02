import React from "react";
import PropTypes from "prop-types";
import { Checkbox } from "antd";

import {
  CustomButton,
  CustomInput,
  CustomRadio,
  CustomCheckbox,
  CustomSelect,
} from "components";
import {
  PROFILE_SETTINGS,
  CONTACT_ICONS,
  TIMEZONE_LIST,
  LANGUAGES,
} from "enum";

import "./style.scss";

const Topics = PROFILE_SETTINGS.TOPICS;
const ProficiencyLevels = PROFILE_SETTINGS.PROFICIENCY_LEVEL;

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
        topicsOfInterest: [],
        personalLinks: {},
        language: "",
        timezone: "",
        completed: false,
        percentOfCompletion: 75,
      },
    };
  }

  onFieldChange = (field, value, subField) => {
    if (field === "personalLinks") {
      this.setState((state) => {
        state.user.personalLinks[subField] = value;
        return state;
      });
    } else {
      this.setState((state) => {
        state.user[field] = value;
        return state;
      });
    }
  };

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
            <CustomInput
              className="textfield-input"
              defaultValue={user.firstName}
              onChange={(value) => this.onFieldChange("firstName", value)}
            />
            <h5 className="textfield-label">Last name</h5>
            <CustomInput
              className="textfield-input"
              defaultValue={user.lastName}
              onChange={(value) => this.onFieldChange("lastName", value)}
            />
            <h5 className="textfield-label">Tell us something about you</h5>
            <CustomInput
              className="textfield-input"
              multiple={true}
              defaultValue={user.about}
              onChange={(value) => this.onFieldChange("about", value)}
            />
            <h5 className="textfield-label">
              What is your title or profession?
            </h5>
            <CustomInput
              className="textfield-input"
              defaultValue={user.titleProfessions}
              onChange={(value) =>
                this.onFieldChange("titleProfessions", value)
              }
            />
            <h5 className="textfield-label">Tell us topics of your interest</h5>
            <Checkbox.Group
              className="custom-checkbox-group"
              onChange={(values) =>
                this.onFieldChange("topicsOfInterest", values)
              }
            >
              {Topics.map((topic) => (
                <CustomCheckbox key={topic} value={topic}>
                  {topic}
                </CustomCheckbox>
              ))}
            </Checkbox.Group>
            <h5 className="textfield-label">What is your proficiency level?</h5>
            <div className="custom-radio-group">
              {ProficiencyLevels.map((level) => (
                <CustomRadio
                  key={level}
                  checked={level === user.proficiencyLevel}
                  onClick={() => this.onFieldChange("proficiencyLevel", level)}
                >
                  {level}
                </CustomRadio>
              ))}
            </div>
            <h5 className="textfield-label">Peronal links</h5>
            <div className="personal-links">
              {Object.keys(CONTACT_ICONS).map((contact) => (
                <div className="personal-link" key={contact}>
                  <div className="personal-link-icon">
                    <i className={CONTACT_ICONS[contact]} />
                  </div>
                  <CustomInput
                    addonBefore="http://"
                    defaultValue={user.personalLinks[contact]}
                    onChange={(value) =>
                      this.onFieldChange("personalLinks", value, contact)
                    }
                  />
                </div>
              ))}
            </div>
            <h5 className="textfield-label">Main language</h5>
            <CustomSelect
              options={LANGUAGES}
              value={user.language}
              onChange={(value) => this.onFieldChange("language", value)}
            />
            <h5 className="textfield-label">Time zone</h5>
            <CustomSelect
              options={TIMEZONE_LIST}
              value={user.timezone}
              onChange={(value) => this.onFieldChange("timezone", value)}
            />
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
