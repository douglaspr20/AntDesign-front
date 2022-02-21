import React, { useState } from "react";
import { Drawer, Form, Checkbox, Popconfirm, notification } from "antd";
import {
  CustomSelect,
  CustomButton,
  CustomCheckbox,
  CustomModal,
} from "components";
import { connect } from "react-redux";
import { COUNTRIES, PROFILE_SETTINGS } from "enum";

import { actions as matchmakingActions } from "redux/actions/matchmaking-actions";
import { matchmakeSelector } from "redux/selectors/matchmakeSelector";
import { categorySelector } from "redux/selectors/categorySelector";

import "./styles.scss";

const MatchmakingDrawer = ({
  visible,
  setVisible,
  allCategories,
  getMatchmake,
  matchmakingUsers,
}) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOnFinish = (values) => {
    getMatchmake(
      {
        countries: JSON.stringify(values.countries),
        topicsOfInterest: JSON.stringify(values.topicsOfInterest),
        recentJobLevel: JSON.stringify(values.recentJobLevel),
        recentWorkArea: JSON.stringify(values.recentWorkArea),
        sizeOfOrganization: JSON.stringify(values.sizeOfOrganization),
      },
      setIsModalVisible
    );

    setVisible(false);
  };

  const handleConfirm = () => {
    notification.info({
      message: "Email sent!",
    });
  };

  const displayMatchmakingUsers = matchmakingUsers.map((user) => {
    const country = COUNTRIES.find((c) => c.value === user.location);

    return (
      <div key={user.id} className="display-matchmaking-users">
        <div>
          <h3>Title: {user.titleProfessions}</h3>
          <h3>Company Size: {user.sizeOfOrganization}</h3>
          <h3>Country: {country.text}</h3>
        </div>
        <Popconfirm
          title="Do you want to connect?"
          onConfirm={handleConfirm}
          okText="Yes"
          cancelText="No"
        >
          <CustomButton text="Match" />
        </Popconfirm>
      </div>
    );
  });

  return (
    <Drawer
      visible={visible}
      onClose={() => setVisible(false)}
      width={520}
      title="Find a match"
    >
      <Form form={form} layout="vertical" onFinish={handleOnFinish}>
        <Form.Item name="countries" label="Countries">
          <CustomSelect mode="multiple" options={COUNTRIES} bordered />
        </Form.Item>
        <Form.Item name="topicsOfInterest" label="Topics of Interest">
          <Checkbox.Group>
            {allCategories.map((topic) => {
              return (
                <CustomCheckbox key={topic.value} value={topic.value}>
                  {topic.title}
                </CustomCheckbox>
              );
            })}
          </Checkbox.Group>
        </Form.Item>
        <Form.Item name="recentJobLevel" label="Recent Job Level">
          <Checkbox.Group>
            {PROFILE_SETTINGS.JOB_LEVELS.map((level) => {
              return (
                <CustomCheckbox key={level.value} value={level.label}>
                  {level.label}
                </CustomCheckbox>
              );
            })}
          </Checkbox.Group>
        </Form.Item>
        <Form.Item name="recentWorkArea" label="Recent Work Areas">
          <Checkbox.Group>
            {PROFILE_SETTINGS.WORK_AREAS.map((area, index) => (
              <CustomCheckbox key={index} value={area.value}>
                {area.label}
              </CustomCheckbox>
            ))}
          </Checkbox.Group>
        </Form.Item>
        <Form.Item name="sizeOfOrganization" label="Size of Organization">
          <Checkbox.Group>
            {PROFILE_SETTINGS.ORG_SIZES.map((org, index) => (
              <CustomCheckbox key={index} value={org.value}>
                {org.label}
              </CustomCheckbox>
            ))}
          </Checkbox.Group>
        </Form.Item>
        <Form.Item>
          <CustomButton text="Submit" type="primary" htmlType="submit" />
        </Form.Item>
      </Form>
      <CustomModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        title="Matchmaking Results"
        width={720}
      >
        <div>{displayMatchmakingUsers}</div>
      </CustomModal>
    </Drawer>
  );
};

const mapStateToProps = (state) => ({
  allCategories: categorySelector(state).categories,
  matchmakingUsers: matchmakeSelector(state).matchmakingUsers,
});

const mapDispatchToProps = {
  ...matchmakingActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(MatchmakingDrawer);
