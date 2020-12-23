import React, { useState } from "react";
import PropTypes from "prop-types";
import { Checkbox } from "antd";

import { CustomButton, CustomInput, CustomCheckbox } from "components";
import { PROFILE_SETTINGS } from "enum";

import "./style.scss";

const Specialties = PROFILE_SETTINGS.SPECIALTIES;

const MenteeSetting = ({ onCancel, onSave }) => {
  const [reason, setReason] = useState("");
  const [title, setTitle] = useState("");
  const [specialties, setSpecialties] = useState([]);

  return (
    <div className="mentee-setting">
      <h2>Becoming into a mentee</h2>
      <h5 className="mentee-setting-sublabel">
        Why do you want to be a mentee?
      </h5>
      <CustomInput
        className="mentee-setting-input"
        multiple={true}
        defaultValue={reason}
        onChange={setReason}
      />
      <h5 className="mentee-setting-sublabel">
        What is your current title / profession?
      </h5>
      <CustomInput
        className="mentee-setting-input"
        defaultValue={title}
        onChange={setTitle}
      />
      <h5 className="mentee-setting-sublabel">What do you want to learn?</h5>
      <Checkbox.Group
        defaultValue={specialties}
        className="mentee-setting-specialties"
        onChange={setSpecialties}
      >
        {Specialties.map((spec, index) => (
          <CustomCheckbox key={`specialty-${index}`} value={spec}>
            {spec}
          </CustomCheckbox>
        ))}
      </Checkbox.Group>
      <div className="mentee-setting-footer">
        <CustomButton
          text="Cancel"
          type="primary outlined"
          size="xl"
          onClick={onCancel}
        />
        <CustomButton text="Save" type="primary" size="lg" onClick={onSave} />
      </div>
    </div>
  );
};

MenteeSetting.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
};

MenteeSetting.defaultProps = {
  onCancel: () => {},
  onSave: () => {},
};

export default MenteeSetting;
