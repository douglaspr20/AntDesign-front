import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Form, Checkbox, notification } from "antd";
import isEmpty from "lodash/isEmpty";

import {
  CustomInput,
  CustomCheckbox,
  CustomButton,
  ImageUpload,
} from "components";
import { SETTINGS } from "enum";

import {
  addChannelLibrary,
  updateChannelLibrary,
} from "redux/actions/library-actions";
import { categorySelector } from "redux/selectors/categorySelector";
import { channelSelector } from "redux/selectors/channelSelector";
import { librarySelector } from "redux/selectors/librarySelector";

import "./style.scss";

const VisibleLevel = SETTINGS.VISIBLE_LEVEL;

const LibraryForm = ({
  allCategories,
  selectedChannel,
  type,
  edit,
  selectedLibrary,
  onAdded,
  onCancel,
  addChannelLibrary,
  updateChannelLibrary,
}) => {
  const refForm = useRef(null);
  const onFinish = (values) => {
    if (edit) {
      updateChannelLibrary({ ...values, id: selectedLibrary.id }, (err) => {
        if (err) {
          notification.error({
            message: err,
          });
        } else {
          notification.info({
            message: "Resource was successfully update.",
          });
          onAdded();
        }
      });
    } else {
      addChannelLibrary(
        {
          ...values,
          channel: selectedChannel.id,
          level: VisibleLevel.CHANNEL,
          contentType: type,
        },
        () => {
          notification.info({
            message: "New resource was successfully created.",
          });
          onAdded();
        }
      );
    }
  };

  const onFinishFailed = () => {};

  useEffect(() => {
    if (edit && !isEmpty(selectedLibrary)) {
      if (refForm && refForm.current) {
        refForm.current.setFieldsValue({
          ...selectedLibrary,
          link: selectedLibrary.link ? selectedLibrary.link.slice(8) : "",
        });
      }
    }
  }, [selectedLibrary, edit]);

  return (
    <div className="library-form-panel">
      <Form
        className="library-form"
        layout="vertical"
        name="basic"
        ref={refForm}
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
        {type !== "video" && (
          <Form.Item name="image" label="Upload image">
            <ImageUpload aspect={400 / 152} />
          </Form.Item>
        )}
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
  edit: PropTypes.bool,
  onCancel: PropTypes.func,
  onAdded: PropTypes.func,
};

LibraryForm.defaultProps = {
  type: "article",
  edit: false,
  onCancel: () => {},
  onAdded: () => {},
};

const mapStateToProps = (state) => ({
  allCategories: categorySelector(state).categories,
  selectedChannel: channelSelector(state).selectedChannel,
  selectedLibrary: librarySelector(state).selectedLibrary,
});

const mapDispatchToProps = {
  addChannelLibrary,
  updateChannelLibrary,
};

export default connect(mapStateToProps, mapDispatchToProps)(LibraryForm);
