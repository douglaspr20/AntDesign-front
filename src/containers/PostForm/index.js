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
  externalForm,
}) => {
  const [form] = Form.useForm();

  const onFinish = (data) => {
    if (postData) {
      onUpdate(data);
    } else {
      addPost(data);
      Emitter.emit(EVENT_TYPES.CLOSE_POST_MODAL);
    }
    if (externalForm != null) {
      externalForm.resetFields();
    }
    form.resetFields();
  };

  return (
    <div className="post-form-container">
      <Form
        form={externalForm == null ? form : externalForm}
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
        <Item
          label={
            <label className="labelFroala">
              What do you want to talk about?
            </label>
          }
          name="text"
          rules={[
            {
              required: true,
              message: "What do you want to talk about? is required.",
            },
          ]}
        >
          <FroalaEdit
            s3Hash={s3Hash}
            config={{
              quickInsertTags: [],
              placeholderText: "Add a post...",
              toolbarButtons: [
                "bold",
                "italic",
                "underline",
                "strikeThrough",
                "subscript",
                "superscript",
                "-",
                "paragraphFormat",
                "align",
                "formatOL",
                "formatUL",
                "indent",
                "outdent",
                "-",
                "insertLink",
                "insertVideo",
                "undo",
                "redo",
              ],
            }}
          />
        </Item>
        <Item label="Hashtags" name="topics">
          <Select allowClear mode="multiple">
            {allCategories.map((item) => (
              <Option key={`option-${item.value}`} value={item.value}>
                {item.title}
              </Option>
            ))}
          </Select>
        </Item>
        <Item label="Upload image" name="imageData">
          <ImageUpload aspect={16 / 9} />
        </Item>
        {externalForm == null && (
          <Item>
            <CustomButton
              htmlType="submit"
              type="primary secondary"
              text={buttonText}
            />
          </Item>
        )}
      </Form>
    </div>
  );
};

PostForm.propTypes = {
  allCategories: PropTypes.array,
  externalForm: PropTypes.object,
};

PostForm.defaultProps = {
  allCategories: [],
  buttonText: "Post",
  externalForm: null,
};

const mapStateToProps = (state) => ({
  allCategories: categorySelector(state).categories,
  s3Hash: envSelector(state).s3Hash,
});

const mapDispatchToProps = {
  addPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
