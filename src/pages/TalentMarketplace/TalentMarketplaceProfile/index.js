import React, { useEffect, useState } from "react";
import { Checkbox, Form, Switch, Radio } from "antd";
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
} from "components";

import "./styles.scss";

const skills = [
  {
    value: "businessAcumen",
    text: "Business Acumen",
    children: [
      {
        value: "agilityAndInnovation",
        text: "Agility and Innovation",
      },
      {
        value: "businessAcumen",
        text: "Business Acumen",
      },
      {
        value: "designThinking",
        text: "Design Thinking",
      },
      {
        value: "financialAcumen",
        text: "Financial Acumen",
      },
      {
        value: "legalAcumen",
        text: "Legal Acumen",
      },
      {
        value: "measuringHrEffectiveness",
        text: "Measuring HR Effectiveness",
      },
      {
        value: "organizationalAgility",
        text: "Organizational Agility",
      },
      {
        value: "projectAndResourceManagement",
        text: "Project and Resource Management",
      },
      {
        value: "problemSolvingAndAnalyticalSkills",
        text: "Problem Solving and Analytical Skills",
      },
    ],
  },
  {
    value: "hrHumanSkills",
    text: "HR Human Skills",
    children: [
      {
        value: "buildingNetworksAndRelationships",
        text: "Building Networks and Relationships",
      },
      {
        value: "coachingCounseling",
        text: "Coaching Counseling",
      },
      {
        value: "changeManagement",
        text: "Change Management",
      },
      {
        value: "communicationAndInfluence",
        text: "Communication and Influence",
      },
      {
        value: "corporateCulture",
        text: "Corporate Culture",
      },
      {
        value: "drivingChange",
        text: "Driving Change",
      },
      {
        value: "negotiation",
        text: "Negotiation",
      },
      {
        value: "peopleAnalytics",
        text: "People Analytics",
      },
      {
        value: "teamFacilitation",
        text: "Team Facilitation",
      },
      {
        value: "teamworkAndCollaboration",
        text: "Teamwork and Collaboration",
      },
    ],
  },
  {
    value: "hrTechnicalSkills",
    text: "HR Technical Skills",
    children: [
      {
        value: "brandCommuication",
        text: "Brand Communication",
      },
      {
        value: "compensationAndBenefitsAdministrationSalaryReviewAndPayroll",
        text: "Compensation and Benefits Administration, Salary Review and Payroll",
      },
      {
        value: "criticalAndStrategicThinking",
        text: "Critical and Strategic Thinking",
      },
      {
        value: "digitalAcumen",
        text: "Digital Acumen",
      },
      {
        value: "diversityEquityInclusionAndBelongingStrategies",
        text: "Diversity, equity, inclusion and belonging strategies.",
      },
      {
        value: "employeeExperienceAndEngagement",
        text: "Employee Experience and Engagement",
      },
      {
        value: "employeeAndLaborRelations",
        text: "Employee & Labor Relations",
      },
      {
        value: "hrTechnologyInformationSoftwareAndSystems",
        text: "HR Technology, Information Software and Systems",
      },
      {
        value: "hrStrategyDesignAndExecution",
        text: "HR Strategy Design and Exection",
      },
      {
        value: "peopleAnalyticsAndReporting",
        text: "People Analytics and Reporting",
      },
      {
        value: "performanceManagement",
        text: "Performance Management",
      },
      {
        value: "onboarding",
        text: "Onboarding",
      },
      {
        value: "organizationalDiagnosisAndDesign",
        text: "Organizational Diagnosis & Design",
      },
      {
        value: "recruitmentHiringAndOnboarding",
        text: "Recruitment, hiring and onboarding",
      },
      {
        value: "wellnessAndWellBeingStrategyDesignAndExecution",
        text: "Wellness and Well-Being strategy design and execution",
      },
    ],
  },
];

const MyTalentMarketplaceProfile = ({
  allCategories,
  getMarketplaceProfile,
  createMarketplaceProfile,
  updateMarketPlaceProfile,
  userProfile,
  marketplaceProfile,
}) => {
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (userProfile.id) {
      getMarketplaceProfile(userProfile.id);
    }
  }, [getMarketplaceProfile, userProfile]);

  useEffect(() => {
    if (marketplaceProfile.id) {
      form.setFieldsValue(marketplaceProfile);
    } else {
      form.resetFields();
    }
  }, [marketplaceProfile, form]);

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

  const displaySkills = skills.map((skill, index) => {
    return (
      <>
        <div key={index}>
          <strong>{skill.text}</strong>
        </div>
        {skill.children.map((item, itemIndex) => {
          return (
            <div className="preferred-skills-wrapper" key={itemIndex}>
              <div className="preferred-skills-main-content">
                <div>{item.text}</div>
              </div>
              <Form.Item name={item.value}>
                <Radio.Group size="large" defaultValue="basic">
                  <div className="preferred-skills-level-content">
                    <Radio value="basic">Basic</Radio>
                    <Radio value="intermediate">Intermediate</Radio>
                    <Radio value="advance">Advance</Radio>
                  </div>
                </Radio.Group>
              </Form.Item>
            </div>
          );
        })}
      </>
    );
  });

  return (
    <div className="talent-marketplace-profile">
      <Form
        layout="vertical"
        form={form}
        onFinish={(data) => handleSubmit(data)}
        className="talent-marketplace-profile-form"
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
          rules={[
            {
              required: true,
              message: "this is required",
            },
          ]}
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
          rules={[
            {
              required: true,
              message: "Please select one!",
            },
          ]}
        >
          <Checkbox.Group>
            {PROFILE_SETTINGS.JOB_LEVELS.map((job) => (
              <CustomCheckbox key={job.value} value={job.value}>
                {job.label}
              </CustomCheckbox>
            ))}
          </Checkbox.Group>
        </Form.Item>

        <Form.Item
          label="What areas in HR are you interested in?"
          name="topics"
          rules={[
            {
              required: true,
              message: "Please select one!",
            },
          ]}
        >
          <CategoriesSelect
            options={allCategories}
            maxValues={allCategories.length}
            style={{ maxWidth: "600px", height: "auto" }}
          />
        </Form.Item>
        <Form.Item
          label="Location type?"
          name="location"
          rules={[
            {
              required: true,
              message: "Please select one!",
            },
          ]}
        >
          <Checkbox.Group>
            {PROFILE_SETTINGS.LOCATIONS.map((location) => (
              <CustomCheckbox key={location.value} value={location.value}>
                {location.label}
              </CustomCheckbox>
            ))}
          </Checkbox.Group>
        </Form.Item>
        <div>
          <div className="preferred-skills-wrapper">
            <div className="preferred-skills-main">
              <h3>Skills</h3>
            </div>
          </div>
          {displaySkills}
        </div>

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
