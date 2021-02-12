import React from "react";
import PropTypes from "prop-types";
import { Checkbox, Modal, notification } from "antd";
import { connect } from "react-redux";

import {
  CustomButton,
  CustomInput,
  CustomCheckbox,
  CustomSelect,
  CustomSwitch,
} from "components";
import { CONTACT_ICONS, TIMEZONE_LIST, LANGUAGES, COUNTRIES } from "enum";
import PhotoUploadForm from "../PhotoUploadForm";
import { isValidEmail } from "utils/format";
import { categorySelector } from "redux/selectors/categorySelector";

import IconPlus from "images/icon-plus.svg";
import IconDelete from "images/icon-delete.svg";

import "./style.scss";

const Languages = LANGUAGES.ParsedLanguageData;

class ProfileEditPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user
        ? { ...props.user, languages: props.user.languages || [""] }
        : { languages: [""] },
      visibleModal: false,
      editImageUrl: props.user ? props.user.img : "",
    };
  }

  onFieldChange = (field, value, subField) => {
    if (field === "personalLinks") {
      this.setState((state) => {
        state.user.personalLinks[subField] = value ? `https://${value}` : "";
        return state;
      });
    } else if (field === "languages") {
      this.setState((state) => {
        state.user.languages[subField] = value;
        return state;
      });
    } else {
      this.setState((state) => {
        state.user[field] = value;
        return state;
      });
    }
  };

  onPhotoSave = (url, base64) => {
    this.setState((state) => {
      state.editImageUrl = url;
      state.visibleModal = false;
      state.user.imageStr = base64;
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

    let error = "";
    if (!user.email) {
      error = "Please input your email address.";
    } else if (!isValidEmail(user.email)) {
      error = "Please input a valid email address.";
    }

    if (error) {
      notification.error({
        message: error,
      });
    } else {
      this.props.onSave({
        ...user,
        languages: user.languages
          ? user.languages.filter((item) => !!item)
          : [],
      });
    }
  };

  onCancel = () => {
    this.props.onCancel();
  };

  onAddLanguage = () => {
    const { user } = this.state;
    if (user.languages) {
      user.languages.push("");
    } else {
      user.languages = [""];
    }

    this.setState({ user });
  };

  onRemoveLanguage = () => {
    const { user } = this.state;
    user.languages = user.languages.slice(0, user.languages.length - 1);
    this.setState({ user });
  };

  render() {
    const { user, visibleModal, editImageUrl } = this.state;

    return (
      <div className="profile-edit-panel">
        <div className="profile-edit-panel-container">
          <div className="profile-edit-panel-header">
            <div className="profile-user-img">
              <div className="profile-user-img-container">
                {editImageUrl ? (
                  <div className="profile-user-img-wrapper">
                    <img src={editImageUrl} alt="user-avatar" />
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
            <h5 className="textfield-label">Email</h5>
            <CustomInput
              className="textfield-input"
              defaultValue={user.email}
              onChange={(value) => this.onFieldChange("email", value)}
            />
            <h5 className="textfield-label">Title</h5>
            <CustomInput
              className="textfield-input"
              defaultValue={user.titleProfessions}
              onChange={(value) =>
                this.onFieldChange("titleProfessions", value)
              }
            />
            <h5 className="textfield-label">Company</h5>
            <CustomInput
              className="textfield-input"
              defaultValue={user.company}
              onChange={(value) => this.onFieldChange("company", value)}
            />
            <h5 className="textfield-label">Location</h5>
            <CustomSelect
              showSearch
              options={COUNTRIES}
              value={user.location}
              optionFilterProp="location"
              onChange={(value) => this.onFieldChange("location", value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            />
            <h5 className="textfield-label">City</h5>
            <CustomInput
              className="textfield-input"
              defaultValue={user.city}
              onChange={(value) => this.onFieldChange("city", value)}
            />
            <h5 className="textfield-label">Time zone</h5>
            <CustomSelect
              showSearch
              options={TIMEZONE_LIST}
              value={user.timezone}
              optionFilterProp="children"
              onChange={(value) => this.onFieldChange("timezone", value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            />
            <h5 className="textfield-label">Main language</h5>
            <div className="language-list">
              {user.languages.map((lang, index) => (
                <div className="language-list-item" key={index}>
                  <CustomSelect
                    showSearch
                    options={Languages}
                    value={lang}
                    optionFilterProp="children"
                    onChange={(value) =>
                      this.onFieldChange("languages", value, index)
                    }
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  />
                </div>
              ))}
              <div className="language-list-actions">
                <div
                  className="language-list-actions-action"
                  onClick={this.onAddLanguage}
                >
                  <img src={IconPlus} alt="icon-plus" />
                </div>
                {user.languages.length > 1 && (
                  <div
                    className="language-list-actions-action"
                    onClick={this.onRemoveLanguage}
                  >
                    <img src={IconDelete} alt="icon-delete" />
                  </div>
                )}
              </div>
            </div>
            <h5 className="textfield-label">Tell us more about you</h5>
            <CustomInput
              className="textfield-input"
              multiple={true}
              defaultValue={user.about}
              onChange={(value) => this.onFieldChange("about", value)}
            />
            <h5 className="textfield-label">Topics of interest</h5>
            <Checkbox.Group
              defaultValue={user.topicsOfInterest}
              className="custom-checkbox-group"
              onChange={(values) =>
                this.onFieldChange("topicsOfInterest", values)
              }
            >
              {this.props.allCategories.map((topic) => (
                <CustomCheckbox key={topic.value} value={topic.value}>
                  {topic.title}
                </CustomCheckbox>
              ))}
            </Checkbox.Group>
            <h5 className="textfield-label">Personal links</h5>
            <div className="personal-links">
              {Object.keys(CONTACT_ICONS).map((contact) => (
                <div className="personal-link" key={contact}>
                  <div className="personal-link-icon">
                    <i className={CONTACT_ICONS[contact]} />
                  </div>
                  <CustomInput
                    addonBefore="https://"
                    defaultValue={
                      user.personalLinks[contact]
                        ? user.personalLinks[contact].replace("https://", "")
                        : ""
                    }
                    onChange={(value) =>
                      this.onFieldChange("personalLinks", value, contact)
                    }
                  />
                </div>
              ))}
            </div>
            <h5 className="textfield-label">
              Are open to receiving information/being contacted via email about
              open job positions?
            </h5>
            <CustomSwitch
              className="open-receive-email"
              checkedChildren="Yes"
              unCheckedChildren="No"
              checked={user.isOpenReceivingEmail === 1}
              onChange={(checked) =>
                this.onFieldChange("isOpenReceivingEmail", checked ? 1 : 0)
              }
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
          <PhotoUploadForm onSave={this.onPhotoSave} />
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

const mapStateToProps = (state) => ({
  allCategories: categorySelector(state).categories,
});

export default connect(mapStateToProps)(ProfileEditPanel);
