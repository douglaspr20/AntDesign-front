import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Select } from "antd";
import Emitter from "services/emitter";

import { CustomButton, FroalaEdit, ImageUpload } from "components";

import { categorySelector } from "redux/selectors/categorySelector";
import { envSelector } from "redux/selectors/envSelector";
import { addPost } from "redux/actions/post-actions";

import { EVENT_TYPES } from "enum";

import "./style.scss";

const { Item } = Form;
const { Option } = Select;

const PostForm = ({
  allCategories,
  s3Hash,
  addPost,
  postData,
  onUpdate,
  buttonText,
}) => {
  const [form] = Form.useForm();

  const onFinish = (data) => {
    if (postData) {
      onUpdate(data);
    } else {
      addPost(data);
      form.resetFields();
      Emitter.emit(EVENT_TYPES.CLOSE_POST_MODAL);
    }
  };

  return (
    <div className="post-form-container">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={
          postData && {
            ...postData,
            topics: postData.topics,
            text: { html: postData.text },
            imageData: postData.imageUrl,
          }
        }
      >
        <Item label="Post content" name="text" rules={[{ required: true }]}>
          <FroalaEdit s3Hash={s3Hash} />
        </Item>
        <Item label="Image" name="imageData">
          <ImageUpload />
        </Item>
        <Item label="Category tags" name="topics">
          <Select allowClear mode="multiple">
            {allCategories.map((item) => (
              <Option key={`option-${item.value}`} value={item.value}>
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
  buttonText: "POST",
};

const mapStateToProps = (state) => ({
  allCategories: categorySelector(state).categories,
  s3Hash: envSelector(state).s3Hash,
});

const mapDispatchToProps = {
  addPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
