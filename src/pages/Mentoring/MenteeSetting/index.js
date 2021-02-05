import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Checkbox } from "antd";
import { connect } from "react-redux";

import { CustomButton, CustomInput, CustomCheckbox } from "components";
import { categorySelector } from "redux/selectors/categorySelector";

import "./style.scss";

const MenteeSetting = ({ setting, allCategories, onCancel, onSave }) => {
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

  useEffect(() => {
    setReason(setting.about);
    setTitle(setting.title);
    setSpecialties(setting.areas);
  }, [setting]);

  return (
    <div className="mentee-setting">
      <div className="mentor-setting-container">
        <h2>Becoming into a mentee</h2>
        <h5 className="mentee-setting-sublabel first">
          Why do you want to be a mentee?
        </h5>
        <CustomInput
          className="mentee-setting-input"
          multiple={true}
          value={reason}
          onChange={setReason}
        />
        <h5 className="mentee-setting-sublabel">
          What is your current or most recent job title?
        </h5>
        <CustomInput
          className="mentee-setting-input"
          value={title}
          onChange={setTitle}
        />
        <h5 className="mentee-setting-sublabel">
          In what areas are you looking for a mentor?
        </h5>
        <Checkbox.Group
          value={specialties}
          className="mentee-setting-specialties"
          onChange={setSpecialties}
        >
          {allCategories.map((spec, index) => (
            <CustomCheckbox key={`specialty-${index}`} value={spec.value}>
              {spec.title}
            </CustomCheckbox>
          ))}
        </Checkbox.Group>
      </div>
      <div className="mentee-setting-footer">
        <CustomButton
          text="Cancel"
          type="primary outlined"
          size="xl"
          onClick={onCancel}
        />
        <CustomButton
          text="Save"
          type="primary"
          size="lg"
          onClick={onClickSave}
        />
      </div>
    </div>
  );
};

MenteeSetting.propTypes = {
  setting: PropTypes.object,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
};

MenteeSetting.defaultProps = {
  setting: {},
  onCancel: () => {},
  onSave: () => {},
};

const mapStateToProps = (state) => ({
  allCategories: categorySelector(state).categories,
});

export default connect(mapStateToProps)(MenteeSetting);
