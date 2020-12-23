import React, { useState } from "react";
import PropTypes from "prop-types";
import { Checkbox } from "antd";

import { CustomButton, CustomInput, CustomCheckbox } from "components";
import { PROFILE_SETTINGS } from "enum";

import "./style.scss";

const Specialties = PROFILE_SETTINGS.SPECIALTIES;

const MentorSetting = ({ onCancel, onSave }) => {
  const [reason, setReason] = useState("");
  const [title, setTitle] = useState("");
  const [specialties, setSpecialties] = useState([]);

  return (
    <div className="mentor-setting">
      <h2>Becoming into a mentor</h2>
      <h5 className="mentor-setting-sublabel">
        Why do you want to be a mentor?
      </h5>
      <CustomInput
        className="mentor-setting-input"
        multiple={true}
        defaultValue={reason}
        onChange={setReason}
      />
      <h5 className="mentor-setting-sublabel">
        What is your title or profession?
      </h5>
      <CustomInput
        className="mentor-setting-input"
        defaultValue={title}
        onChange={setTitle}
      />
      <h5 className="mentor-setting-sublabel">What are your specialties?</h5>
      <Checkbox.Group
        defaultValue={specialties}
        className="mentor-setting-specialties"
        onChange={setSpecialties}
      >
        {Specialties.map((spec, index) => (
          <CustomCheckbox key={`specialty-${index}`} value={spec}>
            {spec}
          </CustomCheckbox>
        ))}
      </Checkbox.Group>
      <div className="mentor-setting-footer">
        <CustomButton
          text="Cancel"
          type="third outlined"
          size="xl"
          onClick={onCancel}
        />
        <CustomButton text="Save" type="secondary" size="lg" onClick={onSave} />
      </div>
    </div>
  );
};

MentorSetting.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
};

MentorSetting.defaultProps = {
  onCancel: () => {},
  onSave: () => {},
};

export default MentorSetting;
