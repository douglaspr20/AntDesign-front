import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Form, Checkbox, notification, DatePicker, Radio } from "antd";

import {
  CustomInput,
  CustomCheckbox,
  CustomButton,
  CustomSelect,
  CustomRadio,
  ImageUpload,
  RichEdit,
  CreditSelect,
  EventCodeGenerator,
} from "components";
import { SETTINGS, TIMEZONE_LIST } from "enum";

import { addChannelLibrary } from "redux/actions/library-actions";
import { categorySelector } from "redux/selectors/categorySelector";
import { channelSelector } from "redux/selectors/channelSelector";

import { isValidURL, convertToUTCTime } from "utils/format";

import "./style.scss";

const VisibleLevel = SETTINGS.VISIBLE_LEVEL;

const { RangePicker } = DatePicker;

const EventTypes = [
  {
    text: "Presentation",
    value: "presentation",
  },
  {
    text: "Workshop",
    value: "workshop",
  },
  {
    text: "Panel",
    value: "panel",
  },
  {
    text: "Peer-to-Peer Conversation",
    value: "peer-to-peer",
  },
  {
    text: "Conference",
    value: "conference",
  },
];

const EventAddEditForm = ({
  allCategories,
  selectedChannel,
  onAdded,
  onCancel,
  addChannelLibrary,
}) => {
  const onFinish = (values) => {
    let params = {
      ...values,
      startDate: convertToUTCTime(values.startAndEndDate[0], values.timezone),
      endDate: convertToUTCTime(values.startAndEndDate[1], values.timezone),
      level: VisibleLevel.CHANNEL,
      channel: selectedChannel.id,
    };
    console.log("params", params);

    onCancel();
    // addChannelLibrary(
    //   {
    //     ...values,
    //     channel: selectedChannel.id,
    //     level: VisibleLevel.CHANNEL,
    //   },
    //   () => {
    //     notification.info({
    //       message: "New resource was successfully created.",
    //     });
    //     onAdded();
    //   }
    // );
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
        <Form.Item name="ticket" label="Tickets">
          <Radio.Group className="d-flex flex-column event-addedit-form-radiogrp">
            <CustomRadio value="free">Free</CustomRadio>
            <CustomRadio value="priced">Priced</CustomRadio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="type" label="Type">
          <Checkbox.Group className="d-flex flex-column event-addedit-form-cbgrp">
            {EventTypes.map((type) => (
              <CustomCheckbox key={type.value} value={type.value}>
                {type.text}
              </CustomCheckbox>
            ))}
          </Checkbox.Group>
        </Form.Item>
        <Form.Item name="location" label="Location">
          <Checkbox.Group className="d-flex flex-column event-addedit-form-cbgrp">
            <CustomCheckbox value="online">Online</CustomCheckbox>
            <CustomCheckbox value="priced">Venue</CustomCheckbox>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item name="description" label="Description">
          <RichEdit readOnly={false} />
        </Form.Item>
        <Form.Item
          name="link"
          label="Link to connect"
          rules={[
            {
              required: false,
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || isValidURL(value)) {
                  return Promise.resolve();
                }
                return Promise.reject("This is not a valid URL!");
              },
            }),
          ]}
        >
          <CustomInput size="sm" />
        </Form.Item>
        <Form.Item name="credit" label="Apply for credits">
          <CreditSelect />
        </Form.Item>
        <Form.Item name="code" label="Event Code">
          <EventCodeGenerator />
        </Form.Item>
        <Form.Item name="image" label="Image">
          <ImageUpload className="event-pic-1" aspect={220 / 280} />
        </Form.Item>
        <Form.Item name="image2" label="Image2">
          <ImageUpload className="event-pic-2" aspect={755 / 305} />
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
