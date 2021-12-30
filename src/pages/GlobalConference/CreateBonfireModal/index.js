import React, { useState } from "react";
import { connect } from "react-redux";
import { Modal, Form, notification } from "antd";
import moment from "moment";
import { createBonfire } from "redux/actions/bonfire-actions";
import { categorySelector } from "redux/selectors/categorySelector";
import { homeSelector } from "redux/selectors/homeSelector";
import { TIMEZONE_LIST } from "enum";
import {
  CategoriesSelect,
  CustomCheckbox,
  CustomInput,
  CustomSelect,
} from "components";

const CreateBonfireModal = ({
  visible,
  onCancel,
  userProfile,
  allCategories,
  createBonfire,
}) => {
  const [bonfireForm] = Form.useForm();
  const [isConsultantOrHRTech, setIsConsultantOrHRTech] = useState(false);

  const handleChecked = (e) => {
    setIsConsultantOrHRTech(e.target.checked);
  };

  const handleBonfire = (data) => {
    const timezone = TIMEZONE_LIST.find(
      (timezone) => timezone.value === data.timezone
    );
    const convertedStartTime = moment
      .tz(
        data.time.format("YYYY-MM-DD h:mm a"),
        "YYYY-MM-DD h:mm a",
        timezone.utc[0]
      )
      .utc()
      .format();

    const convertedEndTime = moment
      .tz(
        data.time.format("YYYY-MM-DD h:mm a"),
        "YYYY-MM-DD h:mm a",
        timezone.utc[0]
      )
      .utc()
      .add("hour", 1)
      .format();

    const bonfireInfo = {
      title: data.title,
      description: data.description,
      link: data.link,
      startTime: convertedStartTime,
      endTime: convertedEndTime,
      isConsultantOrHRTech,
      categories: data.categories,
      bonfireCreator: userProfile.id,
      timezone: data.timezone,
    };

    onCancel();

    createBonfire(bonfireInfo, (error) => {
      if (error) {
        notification.error({
          message: error || "Something went wrong. Please try again.",
        });
      }
    });

    bonfireForm.resetFields();
  };

  return (
    <Modal
      visible={visible}
      onCancel={() => {
        onCancel();
        bonfireForm.resetFields();
      }}
      onOk={() => {
        bonfireForm.submit();
      }}
    >
      <Form
        form={bonfireForm}
        layout="vertical"
        onFinish={(data) => {
          handleBonfire(data);
        }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Title is required." }]}
        >
          <CustomInput />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Description is required." }]}
        >
          <CustomInput multiple={true} />
        </Form.Item>

        <Form.Item
          name="time"
          label="Start time"
          rules={[{ required: true, message: "Time is required." }]}
        >
          <CustomInput type="time" />
        </Form.Item>

        <Form.Item
          name={"timezone"}
          label="Timezone"
          rules={[{ required: true, message: "Timezone is required." }]}
        >
          <CustomSelect
            showSearch
            options={TIMEZONE_LIST}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            className="border"
          />
        </Form.Item>

        <Form.Item
          name="categories"
          label="Categories"
          rules={[{ required: true, message: "Categories is required." }]}
        >
          <CategoriesSelect options={allCategories} />
        </Form.Item>

        <Form.Item
          label="Link"
          name="link"
          rules={[{ required: true, message: "Link is required." }]}
        >
          <CustomInput />
        </Form.Item>

        <Form.Item name="isConsultantOrHRTech">
          <CustomCheckbox
            onChange={handleChecked}
            checked={isConsultantOrHRTech}
          >
            Are you a consultant or HR tech/service vendor?
          </CustomCheckbox>

          {isConsultantOrHRTech && (
            <p style={{ color: "#e61e47" }}>
              Please note: you should not use the bonfire feature to sell
              services or products. These are networking conversations. This is
              a mandatory requirement. Bonfires are not the venues for selling
              and you will be banned from using this feature if you use it for a
              purpose other than networking
            </p>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  allCategories: categorySelector(state).categories,
  userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {
  createBonfire,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateBonfireModal);
