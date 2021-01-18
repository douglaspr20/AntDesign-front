import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { connect } from "react-redux";

import { SpecialtyItem, WantCard, CustomButton } from "components";
import { PROFILE_SETTINGS } from "enum";
import { homeSelector } from "redux/selectors/homeSelector";

import "./style.scss";

const Specialties = PROFILE_SETTINGS.TOPICS;

const MenteePanel = ({
  setting,
  isMentee,
  mobileSetting,
  openSetting,
  onEdit,
}) => {
  const collapsed = mobileSetting.collapsed.mentee;

  return (
    <div className={clsx("mentee-panel", { collapsed: collapsed })}>
      <div className="mentee-panel-container">
        {isMentee ? (
          <div className="mentee-panel-description">
            <CustomButton
              className="mentee-panel-description-edit"
              text="Edit mentee information"
              type="primary outlined"
              size="xs"
              onClick={onEdit}
            />
            <h5 className="mentee-panel-description-label">
              Why do you want to be a mentee?
            </h5>
            <p className="mentee-panel-description-reason">
              {setting.reason || ""}
            </p>
            <div className="mentee-panel-description-specialties">
              {(setting.specialties || []).map((spec, index) => {
                const specialty = Specialties.find(
                  (item) => item.value === spec
                );
                return specialty ? (
                  <SpecialtyItem
                    key={`specialty-${index}`}
                    title={specialty.text}
                  />
                ) : (
                  ""
                );
              })}
            </div>
            <span className="edit-information" onClick={onEdit}>
              Edit mentee information
            </span>
          </div>
        ) : (
          <WantCard type="mentee" onClick={openSetting} />
        )}
      </div>
    </div>
  );
};

MenteePanel.propTypes = {
  setting: PropTypes.object,
  isMentee: PropTypes.bool,
  collapsed: PropTypes.bool,
  openSetting: PropTypes.func,
  onEdit: PropTypes.func,
};

MenteePanel.defaultProps = {
  setting: {},
  isMentee: false,
  openSetting: "",
  collapsed: false,
  onEdit: () => {},
};

const mapStateToProps = (state) => ({
  mobileSetting: homeSelector(state).setting,
});

export default connect(mapStateToProps)(MenteePanel);
