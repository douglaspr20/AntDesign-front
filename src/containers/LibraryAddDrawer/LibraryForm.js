import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Form, Checkbox, notification } from "antd";

import {
  CustomInput,
  CustomCheckbox,
  CustomButton,
  ImageUpload,
} from "components";
import { SETTINGS, SEARCH_FILTERS } from "enum";

import {
  addChannelLibrary,
  getFirstChannelLibraryList,
} from "redux/actions/library-actions";
import { categorySelector } from "redux/selectors/categorySelector";
import { channelSelector } from "redux/selectors/channelSelector";

import "./style.scss";

const VisibleLevel = SETTINGS.VISIBLE_LEVEL;
const ContentType = SEARCH_FILTERS.library["Content type"].reduce(
  (res, item) => ({ ...res, [item.text]: item.value }),
  {}
);

const LibraryForm = ({
  allCategories,
  selectedChannel,
  onCancel,
  addChannelLibrary,
  getFirstChannelLibraryList,
}) => {
  const onFinish = (values) => {
    console.log("values", values);
    onCancel();
    addChannelLibrary(
      {
        ...values,
        channel: selectedChannel.id,
        level: VisibleLevel.CHANNEL,
        contentType: ContentType.Article,
      },
      () => {
        notification.info({
          message: "New resource was successfully created.",
        });
        getFirstChannelLibraryList(
          { channel: selectedChannel.id },
          "newest-first"
        );
      }
    );
  };

  const onFinishFailed = () => {};

  return (
    <div className="library-form-panel">
      <Form
        className="library-form"
        layout="vertical"
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item name="title" label="Title">
          <CustomInput />
        </Form.Item>
        <Form.Item name="link" label="URL">
          <CustomInput addonBefore="https://" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <CustomInput multiple={true} />
        </Form.Item>
        <Form.Item name="topics" label="What are the content topics?">
          <Checkbox.Group className="d-flex flex-column library-form-topics">
            {allCategories.map((topic, index) => (
              <CustomCheckbox key={index} value={topic.value}>
                {topic.title}
              </CustomCheckbox>
            ))}
          </Checkbox.Group>
        </Form.Item>
        <Form.Item name="image" label="Upload image">
          <ImageUpload />
        </Form.Item>
        <div className="library-form-panel-footer">
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
    </div>
  );
};

LibraryForm.propTypes = {
  type: PropTypes.string,
  onCancel: PropTypes.func,
};

LibraryForm.defaultProps = {
  type: "resource",
  onCancel: () => {},
};

const mapStateToProps = (state) => ({
  allCategories: categorySelector(state).categories,
  selectedChannel: channelSelector(state).selectedChannel,
});

const mapDispatchToProps = {
  addChannelLibrary,
  getFirstChannelLibraryList,
};

export default connect(mapStateToProps, mapDispatchToProps)(LibraryForm);
