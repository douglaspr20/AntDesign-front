import React from "react";
import PropTypes from "prop-types";
import { Checkbox, Modal } from "antd";

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
import PhotoUploadForm from "../PhotoUploadForm";
import { getProfileCompletion } from "utils/profile";

import "./style.scss";

const Topics = PROFILE_SETTINGS.TOPICS;
const ProficiencyLevels = PROFILE_SETTINGS.PROFICIENCY_LEVEL;
const Languages = LANGUAGES.ParsedLanguageData;

class ProfileEditPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user ? { ...props.user } : {},
      visibleModal: false,
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

  onPhotoSave = (value) => {
    this.setState((state) => {
      state.user["img"] = value;
      state.visibleModal = false;
      return state;
    });
  };

  showPhotoModal = () => {
    this.setState({ visibleModal: true });
  };

  cancelPhotoUpload = () => {
    this.setState({ visibleModal: false });
  };

  onSave = () => {
    let { user } = this.state;
    user.percentOfCompletion = getProfileCompletion(user);
    user.completed = user.percentOfCompletion === 100;
    this.props.onSave(user);
  };

  onCancel = () => {
    this.props.onCancel();
  };

  render() {
    const { user, visibleModal } = this.state;

    return (
      <div className="profile-edit-panel">
        <div className="profile-edit-panel-container">
          <div className="profile-edit-panel-header">
            <div className="profile-user-img">
              <div className="profile-user-img-container">
                {user.img ? (
                  <div className="profile-user-img-wrapper">
                    <img src={user.img} alt="user-avatar" />
                  </div>
                ) : (
                  <h1 className="profile-user-img-name">{user.abbrName}</h1>
                )}
                <div
                  className="profile-user-img-camera"
                  onClick={this.showPhotoModal}
                >
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
            <h5 className="textfield-label">Company</h5>
            <CustomInput
              className="textfield-input"
              defaultValue={user.company}
              onChange={(value) => this.onFieldChange("company", value)}
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
              defaultValue={user.topicsOfInterest}
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
            <h5 className="textfield-label">Personal links</h5>
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
              options={Languages}
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
          <CustomButton
            text="Cancel"
            type="third outlined"
            size="lg"
            onClick={this.onCancel}
          />
          <CustomButton
            text="Save"
            type="secondary"
            size="lg"
            onClick={this.onSave}
          />
        </div>
        <Modal
          className="photo-upload-modal"
          title={
            <div className="photo-upload-modal-title">Select your photo.</div>
          }
          centered
          visible={visibleModal}
          width={500}
          closable={true}
          maskClosable={false}
          footer={[]}
          onCancel={this.cancelPhotoUpload}
        >
          <PhotoUploadForm src={user.img} onSave={this.onPhotoSave} />
        </Modal>
      </div>
    );
  }
}

ProfileEditPanel.propTypes = {
  user: PropTypes.object,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
};

ProfileEditPanel.defaultProps = {
  user: {},
  onSave: () => {},
  onCancel: () => {},
};

export default ProfileEditPanel;
