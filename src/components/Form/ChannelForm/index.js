import React from "react";
import PropTypes from "prop-types";
import { Form, Checkbox } from "antd";
import { connect } from "react-redux";

import {
  CustomInput,
  CustomButton,
  ImageUpload2,
  CustomCheckbox,
} from "components";

import { categorySelector } from "redux/selectors/categorySelector";

import "./style.scss";

const ChannelForm = ({ channel, allCategories, onSubmit, onCancel }) => {
  const refForm = React.useRef(null);
  const onFinish = (values) => {
    console.log("values", values);
    onSubmit(values);
  };

  const onFinishFailed = () => {};

  const onFormValuesChange = (values) => {
    if (values.categories && values.categories.length > 5) {
      if (refForm && refForm.current) {
        refForm.current.setFieldsValue({
          categories: values.categories.slice(0, 5),
        });
      }
    }
  };

  return (
    <Form
      className="channel-form"
      layout="vertical"
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onValuesChange={onFormValuesChange}
      ref={refForm}
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
      <Form.Item name="categories" label="What are the content topics?">
        <Checkbox.Group className="d-flex flex-column channel-form-topics">
          {allCategories.map((topic, index) => (
            <CustomCheckbox key={index} value={topic.value}>
              {topic.title}
            </CustomCheckbox>
          ))}
        </Checkbox.Group>
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

const mapStateToProps = (state) => ({
  allCategories: categorySelector(state).categories,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelForm);
