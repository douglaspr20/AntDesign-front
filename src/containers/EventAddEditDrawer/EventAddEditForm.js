import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Form, Checkbox, notification, DatePicker, Radio } from "antd";
import omit from "lodash/omit";
import isEmpty from "lodash/isEmpty";

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
  FroalaEdit,
} from "components";
import { SETTINGS, TIMEZONE_LIST } from "enum";

import {
  createChannelEvent,
  updateChannelEvent,
} from "redux/actions/event-actions";
import { categorySelector } from "redux/selectors/categorySelector";
import { channelSelector } from "redux/selectors/channelSelector";
import { eventSelector } from "redux/selectors/eventSelector";
import { envSelector } from "redux/selectors/envSelector";

import {
  isValidURL,
  convertToUTCTime,
  convertToCertainTime,
} from "utils/format";

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
  edit,
  s3Hash,
  selectedEvent,
  onAdded,
  onCancel,
  createChannelEvent,
  updateChannelEvent,
}) => {
  const refForm = useRef(null);
  const [editor, setEditor] = useState("froala");

  const onFinish = (values) => {
    let params = {
      ...omit(values, "startAndEndDate"),
      startDate: convertToUTCTime(values.startAndEndDate[0], values.timezone),
      endDate: convertToUTCTime(values.startAndEndDate[1], values.timezone),
      level: VisibleLevel.CHANNEL,
      channel: selectedChannel.id,
    };
    if (edit) {
      console.log("**** params ", params);
      updateChannelEvent(
        {
          ...params,
          id: selectedEvent.id,
        },
        (err) => {
          if (err) {
            notification.error({
              message: err,
            });
          } else {
            notification.info({
              message: "Event was successfully updated.",
            });
            onAdded();
          }
        }
      );
    } else {
      createChannelEvent(
        {
          ...params,
          channel: selectedChannel.id,
          level: VisibleLevel.CHANNEL,
        },
        () => {
          notification.info({
            message: "New event was successfully created.",
          });
          onAdded();
        }
      );
    }
  };

  const onFinishFailed = () => {};

  useEffect(() => {
    if (edit && !isEmpty(selectedEvent)) {
      if (refForm && refForm.current) {
        refForm.current.setFieldsValue({
          ...selectedEvent,
          startAndEndDate: [
            convertToCertainTime(
              selectedEvent.startDate,
              selectedEvent.timezone
            ),
            convertToCertainTime(selectedEvent.endDate, selectedEvent.timezone),
          ],
        });
      }
    }

    if (edit) {
      if (selectedEvent.description && selectedEvent.description.blocks) {
        setEditor("draft");
      } else {
        setEditor("froala");
      }
    } else {
      setEditor("froala");
    }
  }, [selectedEvent, edit]);

  return (
    <div className="event-addedit-form-panel">
      <Form
        className="event-addedit-form"
        layout="vertical"
        name="basic"
        ref={refForm}
        initialValues={{ ticket: "free" }}
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
            bordered
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
          {editor === "froala" ? (
            <FroalaEdit s3Hash={s3Hash} />
          ) : (
            <RichEdit readOnly={false} data={selectedEvent.description} />
          )}
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
          <EventCodeGenerator disabled={edit} />
        </Form.Item>
        <Form.Item name="image" label="Image (220 / 280)">
          <ImageUpload className="event-pic-1" aspect={220 / 280} />
        </Form.Item>
        <Form.Item name="image2" label="Image2 (755 / 305)">
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
  edit: PropTypes.bool,
  onAdded: PropTypes.func,
  onCancel: PropTypes.func,
};

EventAddEditForm.defaultProps = {
  edit: false,
  onAdded: () => {},
  onCancel: () => {},
};

const mapStateToProps = (state) => ({
  allCategories: categorySelector(state).categories,
  selectedChannel: channelSelector(state).selectedChannel,
  selectedEvent: eventSelector(state).updatedEvent,
  s3Hash: envSelector(state).s3Hash,
});

const mapDispatchToProps = {
  createChannelEvent,
  updateChannelEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventAddEditForm);
