import React from 'react';
import PropTypes from "prop-types";
import { Form, Row, Col, InputNumber, DatePicker } from 'antd';

import { CustomInput, CustomButton, ImageUpload } from "components";

import './style.scss';

const { Item } = Form;

const PodcastForm = ({
  initialValues = {},
  onFinish = () => {},
}) => {
  return (<div className="podcast-form-container">
    <Form
      layout="vertical"
      initialValues={initialValues}
      scrollToFirstError="true"
      onFinish={onFinish}
    >
      <Item
        label="Title"
        name="title"
        rules={[{required: true, message: "Title is required"}]}
      >
        <CustomInput size='sm' />
      </Item>
      <Item
        label="Description"
        name="description"
      >
        <CustomInput size='sm' multiple={true} />
      </Item>
      <Row gutter={24}>
        <Col>
          <Item
            label="Order"
            name="order"
            rules={[{required: true, message: "Order is required"}]}
          >
            <InputNumber />
          </Item>
        </Col>
        <Col>
          <Item
            label="Date"
            name="dateEpisode"
            rules={[{required: true, message: "Date is required"}]}
          >
            <DatePicker />
          </Item>
        </Col>
      </Row>
      <Item
        label="Image"
        name="imageUrl"
      >
        <ImageUpload />
      </Item>
      <Item
        label="Vimeo Link"
        name="vimeoLink"
      >
        <CustomInput size='sm' />
      </Item>

      <Item
        label="Anchor Link"
        name="anchorLink"
      >
        <CustomInput size='sm' />
      </Item>

      <Item
        label="Apple Link"
        name="appleLink"
      >
        <CustomInput size='sm' />
      </Item>

      <Item
        label="Google Link"
        name="googleLink"
      >
        <CustomInput size='sm' />
      </Item>

      <Item
        label="Breaker Link"
        name="breakerLink"
      >
        <CustomInput size='sm' />
      </Item>

      <Item
        label="Pocket Link"
        name="pocketLink"
      >
        <CustomInput size='sm' />
      </Item>

      <Item
        label="Radio Public Link"
        name="radioPublicLink"
      >
        <CustomInput size='sm' />
      </Item>

      <Item
        label="Spotify Link"
        name="spotifyLink"
      >
        <CustomInput size='sm' />
      </Item>

      <Item
        label="I Heart Radio Link"
        name="iHeartRadioLink"
      >
        <CustomInput size='sm' />
      </Item>
      <Item>
        <CustomButton
          size='md'
          text='Save'
          htmlType="submit"
          type="primary"
        />
      </Item>
    </Form>
  </div>);
}

PodcastForm.propTypes = {
  initialValues: PropTypes.object,
  onPay: PropTypes.func,
};

PodcastForm.defaultProps = {
  initialValues: {},
  onFinish: () => {},
};

export default PodcastForm;