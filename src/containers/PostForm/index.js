import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import clsx from "clsx";
import { Form, Select } from "antd";
import { CustomButton, CustomInput, FroalaEdit, ImageUpload } from "components";

import { categorySelector } from "redux/selectors/categorySelector";
import { envSelector } from "redux/selectors/envSelector";
import {
  addPost,
} from "redux/actions/post-actions";

import "./style.scss";

const { Item } = Form;
const { Option } = Select;

const PostForm = ({ 
  allCategories,
  s3Hash,
  addPost,
 }) => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [checkGroupDisabled, setCheckGroupDisabled] = useState(false);

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
    addPost(data);
  };

  return (
    <div className="post-form-container">
      <Form
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
        <Item label="video URL" name="videoUrl">
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
          <CustomButton htmlType="submit" text="POST" />
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
};

const mapStateToProps = (state) => ({
  allCategories: categorySelector(state).categories,
  s3Hash: envSelector(state).s3Hash,
});

const mapDispatchToProps = {
  addPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
