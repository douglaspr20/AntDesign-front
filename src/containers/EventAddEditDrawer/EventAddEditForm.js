import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Form, Checkbox, notification, RangePicker } from "antd";

import {
  CustomInput,
  CustomCheckbox,
  CustomButton,
  CustomSelect,
  ImageUpload,
} from "components";
import { SETTINGS, TIMEZONE_LIST } from "enum";

import { addChannelLibrary } from "redux/actions/library-actions";
import { categorySelector } from "redux/selectors/categorySelector";
import { channelSelector } from "redux/selectors/channelSelector";

import "./style.scss";

const VisibleLevel = SETTINGS.VISIBLE_LEVEL;

const EventAddEditForm = ({
  allCategories,
  selectedChannel,
  onAdded,
  onCancel,
  addChannelLibrary,
}) => {
  const onFinish = (values) => {
    console.log("values", values);
    onCancel();
    addChannelLibrary(
      {
        ...values,
        channel: selectedChannel.id,
        level: VisibleLevel.CHANNEL,
      },
      () => {
        notification.info({
          message: "New resource was successfully created.",
        });
        onAdded();
      }
    );
  };

  const onFinishFailed = () => {};

  return (
    <div className="event-addedit-form-panel">
      <Form
        className="event-addedit-form"
        layout="vertical"
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item name="title" label="Title">
          <CustomInput />
        </Form.Item>
        <Form.Item name="organizer" label="Organizer">
          <CustomInput />
        </Form.Item>
        <Form.Item name="organizerEmail" label="Organizer's Email">
          <CustomInput />
        </Form.Item>
        <Form.Item name="startAndEndDate" label="Start date - End date">
          <RangePicker showTime />
        </Form.Item>
        <Form.Item name="timezone" label="Timezone">
          <CustomSelect
            showSearch
            options={TIMEZONE_LIST}
            optionFilterProp="children"
            onChange={(value) => this.onFieldChange("timezone", value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          />
        </Form.Item>
        <Form.Item name="categories" label="Categories">
          <Checkbox.Group className="d-flex flex-column event-addedit-form-topics">
            {allCategories.map((topic, index) => (
              <CustomCheckbox key={index} value={topic.value}>
                {topic.title}
              </CustomCheckbox>
            ))}
          </Checkbox.Group>
        </Form.Item>
        
        <Form.Item name="image" label="Upload image">
          <ImageUpload aspect={400 / 152} />
        </Form.Item>
        <div className="event-addedit-form-panel-footer">
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

EventAddEditForm.propTypes = {
  onAdded: PropTypes.func,
  onCancel: PropTypes.func,
};

EventAddEditForm.defaultProps = {
  onAdded: () => {},
  onCancel: () => {},
};

const mapStateToProps = (state) => ({
  allCategories: categorySelector(state).categories,
  selectedChannel: channelSelector(state).selectedChannel,
});

const mapDispatchToProps = {
  addChannelLibrary,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventAddEditForm);
