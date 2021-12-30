/* eslint-disable no-template-curly-in-string */
import { Form, Checkbox, Space, DatePicker } from "antd";
import {
  CustomDrawer,
  CustomButton,
  CustomInput,
  CustomSelect,
  CustomCheckbox,
  ImageUpload,
  FroalaEdit,
} from "components";
import { COUNTRIES, PROFILE_SETTINGS, TIMEZONE_LIST, JOB_BOARD } from "enum";
import React, { useEffect } from "react";
import moment from "moment-timezone";
import { connect } from "react-redux";

import { envSelector } from "redux/selectors/envSelector";

const validateMessages = {
  required: "${label} is required!",
  types: {
    url: "${label} is not a valid url!",
  },
};

const JobPostDrawer = ({
  isDrawerVisible,
  setIsDrawerVisible,
  handleOnFinish,
  handlePostButton,
  handleDraftButton,
  form,
  post,
  isEdit = false,
  s3Hash,
}) => {

  useEffect(() => {
    if (isEdit) {
      const country = COUNTRIES.find(
        (country) => country.value === post.country
      );

      const timezone = TIMEZONE_LIST.find((tz) => tz.value === post.timezone);

      form.setFieldsValue({
        title: post.title,
        jobDescription: post.jobDescription,
        city: post.city,
        country: country.value,
        location: post.location,
        salary: post.salary,
        level: post.level,
        preferredSkills: post.preferredSkills,
        linkToApply: post.linkToApply,
        closingDate: moment(post.closingDate),
        timezone: timezone.value,
        companyName: post.companyName,
        companyLogo: post.companyLogo,
        companyDescription: post.companyDescription,
        status: post.status,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayLocationsCheckbox = JOB_BOARD.LOCATIONS.map((location, index) => {
    return (
      <CustomCheckbox key={index} value={location.value}>
        {location.text}
      </CustomCheckbox>
    );
  });

  const levels = PROFILE_SETTINGS.JOB_LEVELS.map((level) => {
    return {
      value: level.value,
      text: level.label,
    };
  });

  return (
    <CustomDrawer
      title={!isEdit ? "Create Job Post" : "Edit Job Post"}
      placement="right"
      visible={isDrawerVisible}
      onClose={() => setIsDrawerVisible(false)}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleOnFinish}
        validateMessages={validateMessages}
      >
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <CustomInput />
        </Form.Item>
        <Form.Item
          name="jobDescription"
          label="Description"
          rules={[{ required: true }]}
        >
          <FroalaEdit s3Hash={s3Hash} />
        </Form.Item>
        <Form.Item name="country" label="Country" rules={[{ required: true }]}>
          <CustomSelect
            options={COUNTRIES}
            bordered
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          />
        </Form.Item>
        <Form.Item name="city" label="City" rules={[{ required: true }]}>
          <CustomInput />
        </Form.Item>
        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true }]}
        >
          <Checkbox.Group>
            <Space>{displayLocationsCheckbox}</Space>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item name="salary" label="Salary" rules={[{ required: true }]}>
          <CustomInput />
        </Form.Item>
        <Form.Item name="level" label="Level" rules={[{ required: true }]}>
          <CustomSelect
            options={levels}
            bordered
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          />
        </Form.Item>
        <Form.Item
          name="preferredSkills"
          label="Preferred Skills"
          rules={[{ required: true }]}
        >
          <CustomSelect
            mode="multiple"
            options={PROFILE_SETTINGS.TOPICS}
            bordered
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          />
        </Form.Item>
        <Form.Item
          name="linkToApply"
          label="Link To Apply"
          rules={[{ required: true, type: "url" }]}
        >
          <CustomInput />
        </Form.Item>
        <Form.Item
          name="closingDate"
          label="Closing Date"
          rules={[{ required: true }]}
        >
          <DatePicker style={{ width: "100%" }} size="large" />
        </Form.Item>
        <Form.Item
          name="timezone"
          label="Timezone"
          rules={[{ required: true }]}
        >
          <CustomSelect
            options={TIMEZONE_LIST}
            bordered
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          />
        </Form.Item>
        <Form.Item
          name="companyName"
          label="Company Name"
          rules={[{ required: true }]}
        >
          <CustomInput />
        </Form.Item>
        <Form.Item
          name="companyLogo"
          label="Company Logo"
          rules={[{ required: true }]}
        >
          <ImageUpload aspect={400 / 100} />
        </Form.Item>
        <Form.Item
          name="companyDescription"
          label="Company Description"
          rules={[{ required: true }]}
        >
          <CustomInput multiple />
        </Form.Item>
        {isEdit && (
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <CustomSelect options={JOB_BOARD.STATUS} bordered />
          </Form.Item>
        )}
        <Space>
          <CustomButton
            text={!isEdit ? "Post" : "Edit"}
            onClick={handlePostButton}
          />
          {!isEdit && (
            <CustomButton
              text="Save as draft"
              type="secondary"
              onClick={handleDraftButton}
            />
          )}
        </Space>
      </Form>
    </CustomDrawer>
  );
};

const mapStateToProps = (state) => ({
  ...envSelector(state),
});

export default connect(mapStateToProps)(JobPostDrawer);
