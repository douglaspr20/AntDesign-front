import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import clsx from "clsx";
import { Form, Select } from "antd";
import { CustomButton, CustomInput, FroalaEdit, ImageUpload } from "components";

import { categorySelector } from "redux/selectors/categorySelector";
import { envSelector } from "redux/selectors/envSelector";
import { addPost } from "redux/actions/post-actions";

import "./style.scss";

const { Item } = Form;
const { Option } = Select;

const PostForm = ({ allCategories, s3Hash, addPost, postData, onUpdate, buttonText }) => {
  const [form] = Form.useForm();
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [checkGroupDisabled, setCheckGroupDisabled] = useState(false);

  useEffect(() => {
    if (postData) {
      form.setFieldsValue({
        ...postData,
        text: { html: postData.text },
      });
    }
  });

  const validLimit = (data) => {
    if (data.hasOwnProperty("topics")) {
      setSelectedTopics(data.topics);
      if (data.topics.length === 3) {
        setCheckGroupDisabled(true);
      } else {
        setCheckGroupDisabled(false);
      }
    }
  };

  const onFinish = (data) => {
    if (postData) {
      onUpdate(data);
    } else {
      addPost(data);
      form.resetFields();
    }
  };

  return (
    <div className="post-form-container">
      <Form
        form={form}
        layout="vertical"
        onValuesChange={(data) => {
          validLimit(data);
        }}
        onFinish={onFinish}
      >
        <Item label="Post content" name="text">
          <FroalaEdit s3Hash={s3Hash} />
        </Item>
        <Item label="Image" name="imageData">
          <ImageUpload />
        </Item>
        <Item label="Video URL" name="videoUrl">
          <CustomInput />
        </Item>
        <Item label="Category tags" name="topics">
          <Select allowClear mode="multiple">
            {allCategories.map((item) => (
              <Option
                key={`option-${item.value}`}
                value={item.value}
                disabled={
                  checkGroupDisabled &&
                  selectedTopics.indexOf(item.value) === -1
                }
              >
                {item.title}
              </Option>
            ))}
          </Select>
        </Item>
        <Item>
          <CustomButton htmlType="submit" text={buttonText} />
        </Item>
      </Form>
    </div>
  );
};

PostForm.propTypes = {
  allCategories: PropTypes.array,
};

PostForm.defaultProps = {
  allCategories: [],
  buttonText: "POST"
};

const mapStateToProps = (state) => ({
  allCategories: categorySelector(state).categories,
  s3Hash: envSelector(state).s3Hash,
});

const mapDispatchToProps = {
  addPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
