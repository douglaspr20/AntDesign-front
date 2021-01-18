import React, { useState } from "react";
import PropTypes from "prop-types";
import { Checkbox } from "antd";

import { CustomButton, CustomInput, CustomCheckbox } from "components";
import { PROFILE_SETTINGS } from "enum";

import "./style.scss";

const Specialties = PROFILE_SETTINGS.TOPICS;

const MentorSetting = ({ setting, onCancel, onSave }) => {
  const [reason, setReason] = useState(setting.reason);
  const [title, setTitle] = useState(setting.title);
  const [specialties, setSpecialties] = useState(setting.specialties || []);

  const onClickSave = () => {
    onSave({
      reason,
      title,
      specialties,
    });
  };

  return (
    <div className="mentor-setting">
      <div className="mentor-setting-container">
        <h2>Becoming into a mentor</h2>
        <h5 className="mentor-setting-sublabel first">
          Why do you want to be a mentor?
        </h5>
        <CustomInput
          className="mentor-setting-input"
          multiple={true}
          defaultValue={reason}
          onChange={setReason}
        />
        <h5 className="mentor-setting-sublabel">
          What is your current or most recent job title?
        </h5>
        <CustomInput
          className="mentor-setting-input"
          defaultValue={title}
          onChange={setTitle}
        />
        <h5 className="mentor-setting-sublabel">
          In what areas do you want to be a mentor?
        </h5>
        <Checkbox.Group
          defaultValue={specialties}
          className="mentor-setting-specialties"
          onChange={setSpecialties}
        >
          {Specialties.map((spec, index) => (
            <CustomCheckbox key={`specialty-${index}`} value={spec.value}>
              {spec.text}
            </CustomCheckbox>
          ))}
        </Checkbox.Group>
      </div>
      <div className="mentor-setting-footer">
        <CustomButton
          text="Cancel"
          type="third outlined"
          size="xl"
          onClick={onCancel}
        />
        <CustomButton
          text="Save"
          type="secondary"
          size="lg"
          onClick={onClickSave}
        />
      </div>
    </div>
  );
};

MentorSetting.propTypes = {
  setting: PropTypes.object,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
};

MentorSetting.defaultProps = {
  setting: {},
  onCancel: () => {},
  onSave: () => {},
};

export default MentorSetting;
