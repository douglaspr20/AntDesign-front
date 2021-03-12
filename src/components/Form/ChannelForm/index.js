import React from "react";
import PropTypes from "prop-types";
import { Form } from "antd";

import { CustomInput, CustomButton, ImageUpload2 } from "components";

import "./style.scss";

const ChannelForm = ({ channel, onSubmit, onCancel }) => {
  const onFinish = (values) => {
    console.log("values", values);
    onSubmit(values);
  };

  const onFinishFailed = () => {};

  return (
    <Form
      className="channel-form"
      layout="vertical"
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="name"
        label="Channel Name"
        rules={[
          { required: true, message: "Please enter the channel name.    " },
        ]}
      >
        <CustomInput />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <CustomInput multiple={true} />
      </Form.Item>
      <Form.Item name="image" label="Upload image">
        <ImageUpload2 width="400px" height="152px" aspect={400 / 152} />
      </Form.Item>
      <div className="channel-form-footer">
        <CustomButton
          text="Cancel"
          type="third outlined"
          size="lg"
          onClick={onCancel}
        />
        <CustomButton
          htmlType="submit"
          text="Submit"
          type="secondary"
          size="lg"
        />
      </div>
    </Form>
  );
};

ChannelForm.propTypes = {
  channel: PropTypes.object,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

ChannelForm.defaultProps = {
  channel: {},
  onSubmit: () => {},
  onCancel: () => {},
};

export default ChannelForm;
