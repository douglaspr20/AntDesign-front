import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Form, Checkbox, notification } from "antd";

import {
  CustomInput,
  CustomCheckbox,
  CustomButton,
  ImageUpload,
  CustomCalendar,
} from "components";
import { SETTINGS } from "enum";

import { addPodcastToChannel } from "redux/actions/podcast-actions";
import { categorySelector } from "redux/selectors/categorySelector";
import { channelSelector } from "redux/selectors/channelSelector";

import "./style.scss";

const VisibleLevel = SETTINGS.VISIBLE_LEVEL;

const PodcastForm = ({
  allCategories,
  selectedChannel,
  onAdded,
  onCancel,
  addPodcastToChannel,
}) => {
  const onFinish = (values) => {
    console.log("values", values);
    addPodcastToChannel(
      {
        ...values,
        channel: selectedChannel.id,
        level: VisibleLevel.CHANNEL,
      },
      () => {
        onAdded();
        onCancel();
        notification.info({
          message: "New podcast was successfully created.",
        });
      }
    );
  };

  const onFinishFailed = () => {};

  return (
    <div className="podcast-form-panel">
      <Form
        className="podcast-form"
        layout="vertical"
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item name="title" label="Title">
          <CustomInput />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <CustomInput multiple={true} />
        </Form.Item>
        <Form.Item name="order" label="Order">
          <CustomInput />
        </Form.Item>
        <Form.Item name="dateEpisode" label="Date">
          <CustomCalendar />
        </Form.Item>
        <Form.Item name="topics" label="Topics?">
          <Checkbox.Group className="d-flex flex-column podcast-form-topics">
            {allCategories.map((topic, index) => (
              <CustomCheckbox key={index} value={topic.value}>
                {topic.title}
              </CustomCheckbox>
            ))}
          </Checkbox.Group>
        </Form.Item>
        <Form.Item name="imageData" label="Upload image">
          <ImageUpload aspect={400 / 152} />
        </Form.Item>
        <Form.Item label="Vimeo Link" name="vimeoLink">
          <CustomInput size="sm" />
        </Form.Item>
        <Form.Item label="Anchor Link" name="anchorLink">
          <CustomInput size="sm" />
        </Form.Item>
        <Form.Item label="Apple Link" name="appleLink">
          <CustomInput size="sm" />
        </Form.Item>
        <Form.Item label="Google Link" name="googleLink">
          <CustomInput size="sm" />
        </Form.Item>
        <Form.Item label="Breaker Link" name="breakerLink">
          <CustomInput size="sm" />
        </Form.Item>
        <Form.Item label="Pocket Link" name="pocketLink">
          <CustomInput size="sm" />
        </Form.Item>
        <Form.Item label="Radio Public Link" name="radioPublicLink">
          <CustomInput size="sm" />
        </Form.Item>
        <Form.Item label="Spotify Link" name="spotifyLink">
          <CustomInput size="sm" />
        </Form.Item>
        <Form.Item label="I Heart Radio Link" name="iHeartRadioLink">
          <CustomInput size="sm" />
        </Form.Item>
        <div className="podcast-form-panel-footer">
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

PodcastForm.propTypes = {
  onCancel: PropTypes.func,
  onAdded: PropTypes.func,
};

PodcastForm.defaultProps = {
  onCancel: () => {},
  onAdded: () => {},
};

const mapStateToProps = (state) => ({
  allCategories: categorySelector(state).categories,
  selectedChannel: channelSelector(state).selectedChannel,
});

const mapDispatchToProps = {
  addPodcastToChannel,
};

export default connect(mapStateToProps, mapDispatchToProps)(PodcastForm);
