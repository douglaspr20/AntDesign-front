import React, { useEffect, useState, useRef } from "react";
import { Checkbox, Form, Radio, Switch } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { marketplaceProfileSelector } from "redux/selectors/marketplaceProfile";
import { homeSelector } from "redux/selectors/homeSelector";
import { categorySelector } from "redux/selectors/categorySelector";
import {
  getMarketplaceProfile,
  createMarketplaceProfile,
  updateMarketPlaceProfile,
} from "redux/actions/marketplaceProfile-actions";
import { PROFILE_SETTINGS } from "enum";
import {
  CustomButton,
  CategoriesSelect,
  CustomCheckbox,
  UploadResumeModal,
  CustomRadio,
} from "components";

import "./style.scss";

const MyTalentMarketplaceProfile = ({
  allCategories,
  getMarketplaceProfile,
  createMarketplaceProfile,
  updateMarketPlaceProfile,
  userProfile,
  marketplaceProfile,
}) => {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const formControl = useRef(null);

  useEffect(() => {
    if (userProfile.id) {
      getMarketplaceProfile(userProfile.id);
    }
  }, [getMarketplaceProfile, userProfile]);

  useEffect(() => {
    if (marketplaceProfile.id) {
      formControl.current.setFieldsValue(marketplaceProfile);
    }
  }, [marketplaceProfile]);

  const handleSubmit = (data) => {
    if (marketplaceProfile.id) {
      updateMarketPlaceProfile({ ...data, id: marketplaceProfile.id });
    } else {
      const marketPlaceInfo = {
        ...data,
        UserId: userProfile.id,
      };
      createMarketplaceProfile(marketPlaceInfo);
    }
  };

  return (
    <div className="my-talent-marketplace-profile">
      <Form
        layout="vertical"
        ref={formControl}
        onFinish={(data) => handleSubmit(data)}
        className="my-talent-marketplace-profile-form"
      >
        <Form.Item
          label="Are you a recruiter?"
          valuePropName="checked"
          name="isRecruiter"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="Do you want your profile to show in the talent marketplace?"
          valuePropName="checked"
          name="showMarketPlaceProfile"
        >
          <Switch />
        </Form.Item>
        <Form.Item>
          <CustomButton
            size="xs"
            text="Upload your resume"
            onClick={() => setShowResumeModal(true)}
          />
          {marketplaceProfile.resumeFileName !== "" && (
            <p>
              <CheckCircleOutlined className="check-icon" />{" "}
              {marketplaceProfile.resumeFileName}
            </p>
          )}
        </Form.Item>

        <Form.Item
          label="What role level are you looking for?"
          name="lookingFor"
        >
          <Radio.Group>
            {PROFILE_SETTINGS.JOB_LEVELS.map((job) => (
              <CustomRadio key={job.value} value={job.value}>
                {job.label}
              </CustomRadio>
            ))}
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="What areas in HR are you interested in?"
          name="topics"
        >
          <CategoriesSelect
            options={allCategories}
            maxValues={allCategories.length}
            style={{ maxWidth: "600px", height: "auto" }}
          />
        </Form.Item>
        <Form.Item label="Location type?" name="location">
          <Checkbox.Group>
            {PROFILE_SETTINGS.LOCATIONS.map((location) => (
              <CustomCheckbox key={location.value} value={location.value}>
                {location.label}
              </CustomCheckbox>
            ))}
          </Checkbox.Group>
        </Form.Item>
        <Form.Item>
          <CustomButton size="lg" text="Save" htmlType="submit" />
        </Form.Item>
        <Form.Item hidden name="UserId" />
      </Form>
      <UploadResumeModal
        visible={showResumeModal}
        onClose={() => setShowResumeModal(false)}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  userProfile: homeSelector(state).userProfile,
  allCategories: categorySelector(state).categories,
  marketplaceProfile: marketplaceProfileSelector(state).marketplaceProfile,
});

const mapDispatchToProps = {
  getMarketplaceProfile,
  createMarketplaceProfile,
  updateMarketPlaceProfile,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyTalentMarketplaceProfile);
